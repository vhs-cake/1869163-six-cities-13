import { createAction } from '@reduxjs/toolkit';
import { CardType } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../const';
import { CommentType } from '../types/comment';
import { ChosenOfferType } from '../types/chosen-offer';
import { OfferNearby } from '../types/offer-nearby';

export const Action = {
  FILTER_BY_CITY: 'FILTER_BY_CITY',
  RESET_SORT: 'RESET_SORT',
  SORT_PRICE_LOW_TO_HIGH: 'SORT_PRICE_LOW_TO_HIGH',
  SORT_PRICE_HIGH_TO_LOW: 'SORT_PRICE_HIGH_TO_LOW',
  SORT_BY_RATING: 'SORT_BY_RATING',
};

export const filterByCityAction = createAction(
  Action.FILTER_BY_CITY,
  (value: string) => ({
    payload: value,
  })
);

export const sortPriceLowToHighAction = createAction(
  Action.SORT_PRICE_LOW_TO_HIGH
);

export const sortPriceHighToLowAction = createAction(
  Action.SORT_PRICE_HIGH_TO_LOW
);

export const sortByRatingAction = createAction(Action.SORT_BY_RATING);

export const resetSortAction = createAction(Action.RESET_SORT);

export const loadOffers = createAction<CardType[]>('data/loadOffers');

export const fetchChosenOffer = createAction<ChosenOfferType>(
  'data/fetchChosenoffer'
);

export const fetchOffersNearby = createAction<OfferNearby[]>(
  'data/fetchOffersNearby'
);

export const fetchFavorites = createAction<CardType[]>('data/fetchFavorites');

export const changeFavoriteStatus = createAction<ChosenOfferType>(
  'data/changeFavoriteStatus'
);

export const loadComments = createAction<CommentType[]>('data/loadComments');

export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);

export const postComment = createAction<CommentType>('data/postComment');

export const setEmail = createAction<string | null>('data/getEmail');

export const setActiveCard = createAction<CardType | null>(
  'cities/setActiveCard'
);

export const setError = createAction<string | null>('cities/setError');

export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus'
);

export const redirectToRoute = createAction<AppRoute>('cities/redirectToRoute');
