import { expect } from "chai";
import ThemeparksApi from "../index";

const Locations = ["cadp", "fldw", "pardl", "tkydl", "shdr"];

function genTest(location) {
  return it(`${location}`, async () => {
    const data = await ThemeparksApi[location].getWaitTimes();
    expect(data).to.be.a("array");
  });
}

describe("Themeparks-getWaitTimes", () => {
  Locations.map((location) => genTest(location));
});
