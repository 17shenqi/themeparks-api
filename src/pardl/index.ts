import Themeparks from '../service/themeparks'

export default class extends Themeparks {
  constructor(options:any = {}) {
    options.parks = [
      {
        name: 'pardl',
        fnName: 'DisneylandParisMagicKingdom'
      },
      {
        name: 'pardsl',
        fnName: 'DisneylandParisWaltDisneyStudios'
      }
    ]
    options.tz = 'Europe/Paris'
    options.location = 'pardl'

    super(options)
  }
}
