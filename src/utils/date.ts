import * as moment from 'moment-timezone';

export function generDates(length = 7, tz) {
  const dates = []
  Array(length).fill(0).forEach((item, index) => {
    dates.push(moment().tz(tz).add(index + 1, 'days').format('YYYY-MM-DD'))
  })
  return dates
}
