import * as fs from 'fs';
import * as moment from 'moment-timezone';
import axios from 'axios';
import * as CryptoJS from 'crypto-js'
import { DestinationDto, DestinationType } from '../dto/destination.dto'
import { ScheduleItemDto, ScheduleItemState } from '../dto/schedule.dto'
import { MediaDto, MediaType } from '../dto/media.dto'
import { countWaitTimes } from '../utils/wait-times'
import Themeparks from './themeparks';

export default class extends Themeparks {
  constructor(options: any = {}) {
    super(options)
    this.city = options.city
    this.parks = options.parks
    this.apiUrl = options.apiUrl || 'https://services.universalorlando.com'
  }

  city: string
  parks: any[]
  apiUrl: string
  location: string

  async fetchToken() {
    const KEY = 'AndroidMobileApp'
    const SECRET = 'AndroidMobileAppSecretKey182014'
    const date = moment().utc().format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT'
    const secret_test = `${KEY}\n${date}\n`
    let signature = CryptoJS.HmacSHA256(secret_test, SECRET).toString(CryptoJS.enc.Base64)
    const params = {
      'apikey': 'AndroidMobileApp',
      signature,
      params: {city: this.city}
    }
    const headers = {
      'Date': date,
      'Content-Type': 'application/json; charset=UTF-8'
    }

    let res
    try {
      res = await axios({
        url: this.apiUrl + '/api',
        method: 'POST',
        data: params,
        headers
      })
    } catch(e) {
      throw new Error(e.response.data)
    }
    return res?.data?.Token
  }

  async getDestinations() {
    const headers = {
      'X-UNIWebService-ApiKey': 'AndroidMobileApp',
      'X-UNIWebService-Token': await this.fetchToken(),
      'Accept-Language': 'en-US'
    }
    const res = await axios({
      url: this.apiUrl + '/api/pointsofinterest',
      params: {city: this.city},
      headers
    })

    const resData = res.data
    const data: DestinationDto[] = []
    resData?.Rides.forEach(item => {
      const parkData = this.parks.find(_ => _.id === item.VenueId)
      const park = parkData?.name
      if (park) {
        data.push(formatDestination(item, {park, type: DestinationType.Attraction}))
      }
    })

    resData?.Shows.forEach(item => {
      const parkData = this.parks.find(_ => _.id === item.VenueId)
      const park = parkData?.name
      if (park) {
        data.push(formatDestination(item, {park, type: DestinationType.Entertainment}))
      }
    })

    return data
  }

  async getTodaySchedules() {
    const headers = {
      'X-UNIWebService-ApiKey': 'AndroidMobileApp',
      'X-UNIWebService-Token': await this.fetchToken()
    }
    const res = await axios({
      url: this.apiUrl + '/api/pointsofinterest',
      params: {city: this.city},
      headers
    })
    const resData = res.data
    const data = []

    resData?.Shows.forEach(item => {
      const parkData = this.parks.find(_ => _.id === item.VenueId)
      const park = parkData?.name
      if (park && item?.StartTimes?.length) {
        data.push(formatSchedules(item, {park, tz: this.tz}))
      }
    })

    return data
  }

  async getSchedules() {
    const data = []
    for (const item of this.parks) {
      const schedules = await this.fetchCalendarByVenueId(item.id)
      data.push({
        name: item.name,
        type: DestinationType.ThemePark,
        park: item.name,
        schedules
      })
    }
    return data
  }

  async fetchCalendarByVenueId(venueId): Promise<ScheduleItemDto[]> {
    const headers = {
      'X-UNIWebService-ApiKey': 'AndroidMobileApp',
      'X-UNIWebService-Token': await this.fetchToken()
    }

    let res
    try {
      res = await axios({
        url: this.apiUrl + `/api/venues/${venueId}/hours`,
        headers
      })
    } catch(e) {
      throw new Error(e.response.data)
    }

    const data = res?.data?.map(item => {
      const state = item.OpenTimeUnix ? ScheduleItemState.Operating : ScheduleItemState.Closed

      return {
        date: item.Date,
        startTime: moment.tz(item.OpenTimeUnix, 'X', this.tz).format('HH:mm:ss'),
        endTime: moment.tz(item.CloseTimeUnix, 'X', this.tz).format('HH:mm:ss'),
        state
      }
    })
    
    return data
  }

  async getWaitTimes() {
    const headers = {
      'X-UNIWebService-ApiKey': 'AndroidMobileApp',
      'X-UNIWebService-Token': await this.fetchToken()
    }

    let res
    try {
      res = await axios({
        url: this.apiUrl + '/api/pointsofinterest/rides',
        headers,
        params: {
          city: this.city,
          pageSize: 'all'
        }
      })
    } catch(e) {
      throw new Error()
    }

    const data = []
    res?.data?.Results.forEach(item => {
      const parkData = this.parks.find(_ => _.id === item.VenueId)
      const park = parkData?.name
      if (park) {
        let state = ScheduleItemState.Operating
        const sourceValue = item.WaitTime
        const value = sourceValue > 0 ? sourceValue : 0
        if (sourceValue === -4) state = ScheduleItemState.Weather
        if ([-1, -3, -50].includes(sourceValue)) state = ScheduleItemState.Closed
        if (sourceValue === 900) state = ScheduleItemState.Down

        data.push({
          name: `${item.Id};entityType=${DestinationType.Attraction};destination=${park}`,
          value,
          park,
          // sourceValue,
          state
        })
      }
    })

    countWaitTimes(data, this.parks)
    return data
  }

  async initAttractions() {
    const res = await this.getWaitTimes()
    const data = res.filter(_ => _.name.includes('Attraction')).map(item => {
      return {
        name: item.name,
        park: item.park
      }
    })
    fs.writeFileSync(`./src/shared/api/themeparks/${this.location}/attractions.json`, JSON.stringify(data));
    return res
  }
}

function formatDestination(item, {park, type}): DestinationDto {
  const medias: MediaDto[] = []

  if (item?.ThumbnailImage) {
    medias.push({
      type: MediaType.ListMobileSquare,
      url: item.ThumbnailImage
    })
  }

  if (item?.ListImage) {
    medias.push({
      type: MediaType.DetailMobileHero,
      url: item.ListImage
    })
  }

  const destination: DestinationDto = {
    title: item.MblDisplayName,
    name: `${item.Id};entityType=${type};destination=${park}`,
    medias,
    type,
    coordinate: [item.Longitude, item.Latitude],
    park,
    facets: {}
  }

  return destination
}


function formatSchedules(item, {park, tz}) {
  const schedules = {
    name: `${item.Id};entityType=${DestinationType.Entertainment};destination=${park}`,
    type: DestinationType.Entertainment,
    park,
    schedules: item.StartTimes.map(startTime => {
      return {
        date: moment().tz(tz).format('YYYY-MM-DD'),
        startTime
      }
    })
  }

  return schedules
}
