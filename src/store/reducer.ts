import { createReducer, current } from '@reduxjs/toolkit';
import {
  filterByCityAction,
  resetSortAction,
  sortByRatingAction,
  sortPriceHighToLowAction,
  sortPriceLowToHighAction,
} from './action';
import { cardsData } from '../mocks/offers';
import { city } from '../mocks/city';

const initialState = {
  initialCards: cardsData,
  cards: cardsData,
  city: city,
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
    });
});

export { reducer };
