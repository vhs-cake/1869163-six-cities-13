import { createReducer, current } from '@reduxjs/toolkit';
import {
  filterByCityAction,
  loadComments,
  loadOffers,
  requireAuthorization,
  resetSortAction,
  setEmail,
  setError,
  setOffersDataLoadingStatus,
  sortByRatingAction,
  sortPriceHighToLowAction,
  sortPriceLowToHighAction,
} from './action';
import { city } from '../mocks/city';
import { AuthorizationStatus } from '../const';
import { CardType } from '../types/offer';
import { CityType } from '../types/city';
import { CommentType } from '../types/comment';

type InitialState = {
  initialCards: CardType[];
  cards: CardType[];
  initialComments: CommentType[];
  city: CityType;
  authorizationStatus: AuthorizationStatus;
  email: string | null;
  isOffersDataLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  initialCards: [],
  cards: [],
  initialComments: [],
  city: city,
  authorizationStatus: AuthorizationStatus.Unknown,
  email: null,
  isOffersDataLoading: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(filterByCityAction, (state, action) => {
      state.cards = current(state).initialCards.filter(
        (card) => card.city.name === action.payload
      );
      state.city = current(state).cards[0].city;
    })
    .addCase(resetSortAction, (state) => {
      state.cards = initialState.initialCards;
    })
    .addCase(sortPriceLowToHighAction, (state) => {
      state.cards = state.initialCards.sort((a, b) => a.price - b.price);
    })
    .addCase(sortPriceHighToLowAction, (state) => {
      state.cards = state.initialCards.sort((a, b) => b.price - a.price);
    })
    .addCase(sortByRatingAction, (state) => {
      state.cards = state.initialCards.sort((a, b) => b.rating - a.rating);
    })
    .addCase(loadOffers, (state, action) => {
      state.initialCards = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.initialComments = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setEmail, (state, action) => {
      state.email = action.payload;
    });
});

export { reducer };
