import Themeparks from '../service/themeparks';

export default class extends Themeparks {
  constructor(options: any = {}) {
    options.parks = [
      {
        name: 'cadp',
        fnName: 'DisneylandResortMagicKingdom',
      },
      {
        name: 'cadap',
        fnName: 'DisneylandResortCaliforniaAdventure',
      },
    ];
    options.tz = 'America/Los_Angeles';
    options.location = 'cadp';
    super(options);
  }
}
