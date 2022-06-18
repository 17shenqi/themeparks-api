import Base from '../service/base'

export default class extends Base{
  constructor(options:any = {}) {
    options.parks = [{
      name: 'shdr'
    }]
    options.tz = 'Asia/Shanghai'
    options.location = 'shdr'
    super(options)
  }
}
