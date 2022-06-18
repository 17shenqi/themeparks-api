export interface MediaDto {
  url: String;
  type: MediaType;
}

export enum MediaType {
  ListMobileSquare = 'ListMobileSquare',
  DetailMobileHero = 'DetailMobileHero',
}
