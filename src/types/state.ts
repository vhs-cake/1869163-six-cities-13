import { store } from '../store/index.ts';
import { AuthorizationStatus } from '../const';
import { CardType } from './offer.ts';
import { CommentType } from './comment.ts';
import { ChosenOfferType } from './chosen-offer.ts';
import { OfferNearby } from './offer-nearby.ts';
import { CityType } from './city.ts';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  email: string;
};

export type CitiesProcess = {
  error: string | null;
  activeCard: CardType | null;
};

export type CitiesData = {
  initialCards: CardType[];
  cards: CardType[];
  initialComments: CommentType[];
  favoriteCards: CardType[];
  isOffersDataLoading: boolean;
  chosenOffer: ChosenOfferType | null;
  offersNearby: OfferNearby[];
  city: CityType;
  hasError: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CheckAuthResponse = {
  data: {
    email: string;
    token: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

export type ChangeFavoriteResponse = {
  data: {
    id: string;
    isFavorite: boolean;
  };
};
