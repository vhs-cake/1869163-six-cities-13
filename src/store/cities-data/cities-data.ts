import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, Setting, city } from '../../const';
import { CitiesData } from '../../types/state';
import {
  changeFavoriteStatusAction,
  fetchChosenOfferAction,
  fetchCommentsAction,
  fetchFavoritesAction,
  fetchOffersAction,
  fetchOffersNearbyAction,
} from '../api-actions';
import { CardType } from '../../types/offer';
import { getUpdatedCards, sortByDate } from '../../utils';

const initialState: CitiesData = {
  favoriteCards: [],
  isOffersDataLoading: false,
  isChosenOfferLoading: false,
  isFavoritesLoading: false,
  chosenOffer: null,
  city: city,
  activeCityName: city.name,
  hasError: false,
};

export const citiesData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setInitialCards(state, { payload }: PayloadAction<CardType[]>) {
      state.initialCards = payload;
    },
    setCards(state, { payload }: PayloadAction<CardType[]>) {
      state.cards = payload;
    },
    setFavoriteCards(state, { payload }: PayloadAction<CardType[]>) {
      state.favoriteCards = payload;
    },
    setActiveCityName(state, { payload }: PayloadAction<string>) {
      state.activeCityName = payload;
    },
    resetSort(state) {
      state.cards = initialState.initialCards;
    },
    sortPriceLowToHigh(state) {
      state.cards = state.cards?.sort((a, b) => a.price - b.price);
    },
    sortPriceHighToLow(state) {
      state.cards = state.cards?.sort((a, b) => b.price - a.price);
    },
    sortByRating(state) {
      state.cards = state.cards?.sort((a, b) => b.rating - a.rating);
    },
    filterByCity(state, { payload }: PayloadAction<string>) {
      state.cards = state.initialCards?.filter(
        (card) => card.city.name === payload
      );

      if (!state.cards?.length) {
        return;
      }
      state.city = state.cards[0].city;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.initialCards = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.initialComments = action.payload.sort(sortByDate);
      })
      .addCase(fetchChosenOfferAction.fulfilled, (state, action) => {
        state.chosenOffer = action.payload;
        state.isChosenOfferLoading = false;
      })
      .addCase(fetchChosenOfferAction.pending, (state) => {
        state.isChosenOfferLoading = true;
      })
      .addCase(fetchChosenOfferAction.rejected, (state) => {
        state.isChosenOfferLoading = false;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
        state.randomOffersNearby = state.offersNearby
          .sort(() => Math.random() - 0.5)
          .slice(0, Setting.OfferMapPointsCount);
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoriteCards = action.payload;
      })
      .addCase(changeFavoriteStatusAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        state.isFavoritesLoading = false;

        const { id, isFavorite } = action.payload;

        if (!state.initialCards || !state.cards) {
          return;
        }

        const updatedCard = {
          ...state.initialCards.filter((card) => card.id === id)[0],
          isFavorite: isFavorite,
        };

        state.cards = getUpdatedCards(id, updatedCard, state.cards);

        state.initialCards = getUpdatedCards(
          id,
          updatedCard,
          state.initialCards
        );

        state.favoriteCards = getUpdatedCards(
          id,
          updatedCard,
          state.favoriteCards
        ).filter((card) => card.isFavorite);

        if (state.chosenOffer?.id === id) {
          state.chosenOffer = { ...state.chosenOffer, isFavorite: isFavorite };
        }

        if (!state.randomOffersNearby) {
          return;
        }

        state.randomOffersNearby = getUpdatedCards(
          id,
          updatedCard,
          state.randomOffersNearby,
          true
        );
      });
  },
});

export const {
  setInitialCards,
  setCards,
  setFavoriteCards,
  setActiveCityName,
  resetSort,
  sortPriceLowToHigh,
  sortPriceHighToLow,
  sortByRating,
  filterByCity,
} = citiesData.actions;
