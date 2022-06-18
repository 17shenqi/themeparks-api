import Themeparks from '../service/themeparks';

export default class extends Themeparks {
  constructor(options: any = {}) {
    options.parks = [
      {
        name: 'fldw',
        fnName: 'WaltDisneyWorldMagicKingdom',
      },
      {
        name: 'fle',
        fnName: 'WaltDisneyWorldEpcot',
      },
      {
        name: 'flak',
        fnName: 'WaltDisneyWorldAnimalKingdom',
      },
      {
        name: 'flhs',
        fnName: 'WaltDisneyWorldHollywoodStudios',
      },
    ];
    options.tz = 'America/New_York';
    options.location = 'fldw';

    super(options);
  }
}
