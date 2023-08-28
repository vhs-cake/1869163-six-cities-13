import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AppDispatch,
  ChangeFavoriteResponse,
  CheckAuthResponse,
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
  { extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<CardType[]>(APIRoute.Offers);
  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  CommentType[],
  { offerId: string },
  { extra: AxiosInstance }
>('data/fetchComments', async ({ offerId }, { extra: api }) => {
  const { data } = await api.get<CommentType[]>(
    `${APIRoute.Comments}/${offerId}`
  );
  return data;
});

export const fetchChosenOfferAction = createAsyncThunk<
  ChosenOfferType,
  { offerId: string },
  { extra: AxiosInstance }
>('data/fetchChosenOffer', async ({ offerId }, { extra: api }) => {
  const { data } = await api.get<ChosenOfferType>(
    `${APIRoute.Offers}/${offerId}`
  );
  return data;
});

export const fetchOffersNearbyAction = createAsyncThunk<
  CardType[],
  { offerId: string },
  { extra: AxiosInstance }
>('data/fetchOffersNearby', async ({ offerId }, { extra: api }) => {
  const { data } = await api.get<CardType[]>(
    `${APIRoute.Offers}/${offerId}/nearby`
  );
  return data;
});

export const fetchFavoritesAction = createAsyncThunk<
  CardType[],
  undefined,
  { extra: AxiosInstance }
>('data/fetchFavorites', async (_arg, { extra: api }) => {
  const { data } = await api.get<CardType[]>(APIRoute.Favorites);
  return data;
});

export const changeFavoriteStatusAction = createAsyncThunk<
  ChangeFavoriteResponse,
  CardType | ChosenOfferType,
  { extra: AxiosInstance }
>('data/changeFavoriteStatus', async (offer, { extra: api }) => {
  const status = offer.isFavorite ? 0 : 1;

  const { data } = await api.post<ChangeFavoriteResponse>(
    `${APIRoute.Favorites}/${offer.id}/${status}`
  );

  return data;
});

export const postCommentAction = createAsyncThunk<
  void,
  { offerId: string; comment: string; rating: number },
  {
    dispatch: AppDispatch;
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
    dispatch(fetchFavoritesAction());
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
