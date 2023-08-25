import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AppDispatch,
  ChangeFavoriteResponse,
  CheckAuthResponse,
  State,
} from '../types/state.js';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { CardType } from '../types/offer.js';
import { CommentType } from '../types/comment.js';
import { ChosenOfferType } from '../types/chosen-offer.js';
import { setError } from './cities-process/cities-process.js';
import { setEmail } from './user-process/user-process.js';

export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  (_, { dispatch }) => {
    setTimeout(() => dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
  }
);

export const fetchOffersAction = createAsyncThunk<
  CardType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<CardType[]>(APIRoute.Offers);
  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  CommentType[],
  { offerId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async ({ offerId }, { extra: api }) => {
  const { data } = await api.get<CommentType[]>(
    `${APIRoute.Comments}/${offerId}`
  );
  return data;
});

export const fetchChosenOfferAction = createAsyncThunk<
  ChosenOfferType,
  { offerId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchChosenOffer', async ({ offerId }, { extra: api }) => {
  const { data } = await api.get<ChosenOfferType>(
    `${APIRoute.Offers}/${offerId}`
  );
  return data;
});

export const fetchOffersNearbyAction = createAsyncThunk<
  CardType[],
  { offerId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffersNearby', async ({ offerId }, { extra: api }) => {
  const { data } = await api.get<CardType[]>(
    `${APIRoute.Offers}/${offerId}/nearby`
  );
  return data;
});

export const fetchFavoritesAction = createAsyncThunk<
  CardType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavorites', async (_arg, { extra: api }) => {
  const { data } = await api.get<CardType[]>(APIRoute.Favorites);
  return data;
});

export const changeFavoriteStatusAction = createAsyncThunk<
  {
    cards: CardType[];
    initialCards: CardType[];
    favoriteCards: CardType[];
    filteredFavoriteCards: CardType[];
    chosenOffer: ChosenOfferType | null;
    offersNearby: CardType[];
  },
  { offerId: string; status: 1 | 0 },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/changeFavoriteStatus',
  async ({ offerId, status }, { getState, extra: api }) => {
    const response: ChangeFavoriteResponse = await api.post<ChosenOfferType>(
      `${APIRoute.Favorites}/${offerId}/${status}`,
      { status }
    );

    const initialCards = getState().DATA.initialCards;
    const cards = getState().DATA.cards;
    const favoriteCards = [...getState().DATA.favoriteCards];
    const filteredFavoriteCards = [...getState().DATA.filteredFavoriteCards];
    const chosenOffer = getState().DATA.chosenOffer;
    const offersNearby = [...getState().DATA.offersNearby];

    const updatedCard = {
      ...initialCards.filter((card) => card.id === response.data.id)[0],
      isFavorite: response.data.isFavorite,
    };

    function getUpdatedCards(
      cardsToUpdate: CardType[],
      forceIgnorePushToUpdate?: boolean
    ) {
      if (
        !cardsToUpdate.some((card) => card.id === offerId) &&
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

    return {
      cards: getUpdatedCards(cards),
      initialCards: getUpdatedCards(initialCards),
      offersNearby: getUpdatedCards(offersNearby, true),
      favoriteCards: getUpdatedCards(favoriteCards).filter(
        (card) => card.isFavorite
      ),
      filteredFavoriteCards: getUpdatedCards(filteredFavoriteCards).filter(
        (card) => card.isFavorite
      ),
      chosenOffer:
        chosenOffer?.id === response.data.id
          ? { ...chosenOffer, isFavorite: response.data.isFavorite }
          : chosenOffer,
    };
  }
);

export const postCommentAction = createAsyncThunk<
  void,
  { offerId: string; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/postComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    await api.post<CommentType>(`${APIRoute.Comments}/${offerId}`, {
      comment,
      rating,
    });

    dispatch(fetchCommentsAction({ offerId }));
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  const response: CheckAuthResponse = await api.get(APIRoute.Login);

  dispatch(setEmail(response.data.email));
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);

    dispatch(setEmail(email));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
