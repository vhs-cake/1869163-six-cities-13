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

const initialState: CitiesData = {
  initialCards: [],
  cards: [],
  initialComments: [],
  favoriteCards: [],
  isOffersDataLoading: false,
  chosenOffer: null,
  offersNearby: [],
  randomOffersNearby: [],
  city: city,
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
    resetSort(state) {
      state.cards = initialState.initialCards;
    },
    sortPriceLowToHigh(state) {
      state.cards = state.cards.sort((a, b) => a.price - b.price);
    },
    sortPriceHighToLow(state) {
      state.cards = state.cards.sort((a, b) => b.price - a.price);
    },
    sortByRating(state) {
      state.cards = state.cards.sort((a, b) => b.rating - a.rating);
    },
    filterByCity(state, { payload }: PayloadAction<string>) {
      state.cards = state.initialCards.filter(
        (card) => card.city.name === payload
      );
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
        state.initialComments = action.payload.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      })
      .addCase(fetchChosenOfferAction.fulfilled, (state, action) => {
        state.chosenOffer = action.payload;
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
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const { id, isFavorite } = action.payload;

        const updatedCard = {
          ...state.initialCards.filter((card) => card.id === id)[0],
          isFavorite: isFavorite,
        };

        function getUpdatedCards(
          cardsToUpdate: CardType[],
          forceIgnorePushToUpdate?: boolean
        ) {
          if (
            !cardsToUpdate.some((card) => card.id === id) &&
            !forceIgnorePushToUpdate
          ) {
            cardsToUpdate.push(updatedCard);
          }

          const updatedCards = cardsToUpdate.map((card) => {
            if (card.id === updatedCard.id) {
              return updatedCard;
            }
            return card;
          });

          return updatedCards;
        }

        state.cards = getUpdatedCards(state.cards);

        state.initialCards = getUpdatedCards(state.initialCards);

        state.randomOffersNearby = getUpdatedCards(
          state.randomOffersNearby,
          true
        );

        state.favoriteCards = getUpdatedCards(state.favoriteCards).filter(
          (card) => card.isFavorite
        );

        if (state.chosenOffer?.id === id) {
          state.chosenOffer = { ...state.chosenOffer, isFavorite: isFavorite };
        }
      });
  },
});

export const {
  setInitialCards,
  setCards,
  setFavoriteCards,
  resetSort,
  sortPriceLowToHigh,
  sortPriceHighToLow,
  sortByRating,
  filterByCity,
} = citiesData.actions;
