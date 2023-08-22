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
import { OfferNearby } from '../types/offer-nearby.js';
import { setError } from './cities-process/cities-process.js';
import { setEmail } from './user-process/user-process.js';
import {
  setCards,
  setFavoriteCards,
  setInitialCards,
} from './cities-data/cities-data.js';

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
  OfferNearby[],
  { offerId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffersNearby', async ({ offerId }, { extra: api }) => {
  const { data } = await api.get<OfferNearby[]>(
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
  void,
  { offerId: string; status: 1 | 0 },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/changeFavoriteStatus',
  async ({ offerId, status }, { dispatch, getState, extra: api }) => {
    const response: ChangeFavoriteResponse = await api.post<ChosenOfferType>(
      `${APIRoute.Favorites}/${offerId}/${status}`,
      { status }
    );
    const initialCards = getState().DATA.initialCards;
    const cards = getState().DATA.cards;
    const favoriteCards = getState().DATA.favoriteCards;

    function getUpdatedCards(cardsToUpdate: CardType[]) {
      const cardToUpdate = cardsToUpdate.filter(
        (card) => card.id === response.data.id
      )[0];

      const updatedCard = {
        ...cardToUpdate,
        isFavorite: response.data.isFavorite,
      };

      const updatedCards = cardsToUpdate.map((card) => {
        if (card.id === updatedCard.id) {
          return updatedCard;
        }
        return card;
      });

      return updatedCards;
    }

    dispatch(setInitialCards(getUpdatedCards(initialCards)));
    dispatch(setCards(getUpdatedCards(cards)));
    dispatch(
      setFavoriteCards(
        getUpdatedCards(favoriteCards).filter((card) => card.isFavorite)
      )
    );
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
>('data/postComment', async ({ offerId, comment, rating }, { extra: api }) => {
  await api.post<CommentType>(`${APIRoute.Comments}/${offerId}`, {
    comment,
    rating,
  });
});

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
