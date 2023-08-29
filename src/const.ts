import { CityType } from './types/city';

export const Setting = {
  ReviewCountMax: 10,
  ReviewCharactersMin: 50,
  ReviewCharactersMax: 300,
  OfferMapPointsCount: 3,
};

export const TIMEOUT_SHOW_ERROR = 2000;

export const city: CityType = {
  name: 'Paris',
  location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
};

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorites = '/favorite',
}

export enum NameSpace {
  Data = 'DATA',
  Cities = 'CITIES',
  User = 'USER',
}

export enum CardSort {
  POPULAR = 'Popular',
  LOW_TO_HIGH = 'Price: low to high',
  HIGH_TO_LOW = 'Price: high to low',
  TOP_RATED_FIRST = 'Top rated first',
}

export enum ApartmentType {
  apartment = 'Apartment',
  room = 'Private Room',
  house = 'House',
  hotel = 'Hotel',
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';
