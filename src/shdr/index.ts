import Themeparks from "../service/themeparks";

export default class extends Themeparks {
  constructor(options: any = {}) {
    options.parks = [
      {
        name: "shdr",
      },
    ];
    options.tz = "Asia/Shanghai";
    options.location = "shdr";
    super(options);
  }
}
