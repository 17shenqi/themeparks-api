import * as moment from 'moment-timezone';
import * as fs from 'fs';
import * as path from 'path';

export default class {
  constructor(options: any = {}) {
    this.parks = options.parks;
    this.tz = options.tz;
    this.location = options.location;
  }

  parks: any[];
  tz: string;
  location: string;

  getToday() {
    return moment.tz(this.tz).format('YYYY-MM-DD');
  }

  getTz() {
    return this.tz;
  }

  getParks() {
    return this.parks.map((_) => _.name);
  }

  getDates(length = 7) {
    const dates = [];
    Array(length)
      .fill(0)
      .forEach((item, index) => {
        dates.push(
          moment()
            .tz(this.tz)
            .add(index + 1, 'days')
            .format('YYYY-MM-DD')
        );
      });
    return dates;
  }

  getAttractions() {
    const data = fs.readFileSync(
      path.resolve(__dirname, '..', this.location, 'attractions.json')
    );
    return JSON.parse(data.toString('utf-8'));
  }
}
