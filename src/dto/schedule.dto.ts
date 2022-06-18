import { DestinationType } from '../dto/destination.dto';

export interface ScheduleDto {
  name: String;
  park: String;
  type: DestinationType;
  schedules: ScheduleItemDto[];
}

export interface ScheduleItemDto {
  date: String;
  startTime: String;
  endTime: String;
  state: ScheduleItemState;
}

export enum ScheduleItemState {
  Operating = 'Operating',
  PerformanceTime = 'PerformanceTime', // 计划时间
  NoPerformance = 'NoPerformance', // 无计划
  Closed = 'Closed', // 关闭
  Down = 'Down', // 暂时关闭
  Refurbishment = 'Refurbishment', // 计划性维护
  Weather = 'Weather', // 天气原因关闭
  SpecialTicketedEvent = 'SpecialTicketedEvent', // 特别票活动
}
