import * as fs from "fs";
import * as path from "path";
import * as moment from "moment-timezone";
import * as Themeparks from "themeparks";
import { ScheduleDto, ScheduleItemDto } from "../dto/schedule.dto";
import { DestinationType } from "../dto/destination.dto";
import { WaitTimesDto } from "../dto/wait-times.dto";
import { ChannelType } from "../dto/setting.dto";
import Base from "./base";

export default class extends Base {
  constructor(options: any = {}) {
    super(options);
    this.parks =
      options.parks?.map((item) => {
        const fnName = item.fnName;
        if (fnName && Themeparks.Parks[fnName]) {
          item.fn = new Themeparks.Parks[fnName]();
        }
        return item;
      }) || [];
    this.destinations = this.getAttractions();
  }

  destinations: any[];

  async getSchedules(): Promise<ScheduleDto[]> {
    return await getSchedules(this.parks, this.tz);
  }

  async getTodaySchedules(channel): Promise<ScheduleDto[]> {
    const schedules = await getSchedules(this.parks, this.tz);
    const today = this.getToday();
    return schedules.map((item) => {
      return {
        ...item,
        schedules: item.schedules.filter((_) => _.date === today),
      };
    });
  }

  async getWaitTimes(): Promise<WaitTimesDto[]> {
    return await getWaitTimes(this.parks, this.destinations);
  }
}

// 获取时间表
async function getSchedules(parks, tz): Promise<ScheduleDto[]> {
  const data: ScheduleDto[] = [];
  for (const parkItem of parks) {
    const res = await parkItem.fn.GetOpeningTimes();
    data.push({
      name: parkItem.name,
      type: DestinationType.ThemePark,
      park: parkItem.name,
      schedules: res.map((item) => {
        return {
          date: item.date,
          state: item.type,
          startTime: moment.tz(item.openingTime, tz).format("HH:mm:ss"),
          endTime: moment.tz(item.closingTime, tz).format("HH:mm:ss"),
        };
      }),
    });
  }
  return data;
}

// 获取等候时间
async function getWaitTimes(parks, destinations): Promise<WaitTimesDto[]> {
  const NamsMap = {};
  destinations.forEach((item) => {
    NamsMap[item.title] = item.name;
  });

  const data: WaitTimesDto[] = [];
  for (const parkItem of parks) {
    const res = await parkItem.fn.GetWaitTimes();
    parkItem.count = 0;
    res.forEach((item) => {
      const value = item?.waitTime || 0;
      const name = NamsMap[item.name];
      if (name) {
        data.push({
          name,
          value,
          park: parkItem.name,
          state: item.status,
        });
        parkItem.count += value;
      }
    });

    data.push({
      name: parkItem.name,
      value: parkItem.count,
      park: parkItem.name,
    });
  }

  return data;
}
