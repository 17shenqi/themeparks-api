import Themeparks from '../service/themeparks'

export default class extends Themeparks {
  constructor(options:any = {}) {
    options.parks = [
      {
        name: 'tkydl',
        fnName: 'TokyoDisneyResortMagicKingdom' 
      },
      {
        name: 'tkys',
        fnName: 'TokyoDisneyResortDisneySea' 
      }
    ]
    options.tz = 'Asia/Tokyo'
    options.location = 'tkydl'

    super(options)
  }
}
