import { expect } from 'chai';
import ThemeparksApi from '../index';

const Locations = ['fldw', 'cadp', 'pardl', 'tkydl', 'shdr'];

function genTest(location) {
  return it(`${location}`, async () => {
    const data = await ThemeparksApi[location].getTodaySchedules();
    expect(data).to.be.a('array');
  });
}

describe('getTodaySchedules', () => {
  Locations.map((location) => genTest(location));
});
