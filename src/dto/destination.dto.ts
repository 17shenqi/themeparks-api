import { MediaDto } from '../dto/media.dto';

export interface DestinationDto {
  name: String;
  title: String;
  type: DestinationType;
  medias: MediaDto[];
  coordinate: [Number, Number];
  facets: any;
  park: String;
}

export enum DestinationType {
  Attraction = 'Attraction',
  Entertainment = 'Entertainment',
  ThemePark = 'ThemePark',
}
