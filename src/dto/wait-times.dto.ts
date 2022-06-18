import { ScheduleItemState } from './schedule.dto';

export interface WaitTimesDto {
  name: String;
  value: Number;
  park: String;
  state?: ScheduleItemState;
}
