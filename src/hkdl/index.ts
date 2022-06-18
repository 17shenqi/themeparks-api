import Themeparks from '../service/themeparks'

export default class extends Themeparks {
  constructor(options:any = {}) {
    options.parks = [
      {
        name: 'hkdl',
        fnName: 'HongKongDisneyland'
      }
    ]
    options.tz = 'Asia/Shanghai'
    options.location = 'hkdl'

    super(options)
  }
}
