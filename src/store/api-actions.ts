import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import {
  changeFavoriteStatus,
  fetchChosenOffer,
  fetchFavorites,
  fetchOffersNearby,
  loadComments,
  loadOffers,
  postComment,
  redirectToRoute,
  requireAuthorization,
  setEmail,
  setError,
  setOffersDataLoadingStatus,
} from './action';
import { saveToken, dropToken } from '../services/token';
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  TIMEOUT_SHOW_ERROR,
} from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { CardType } from '../types/offer.js';
import { store } from './index';
import { CommentType } from '../types/comment.js';
import { ChosenOfferType } from '../types/chosen-offer.js';
import { OfferNearby } from '../types/offer-nearby.js';

export const clearErrorAction = createAsyncThunk('data/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<CardType[]>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(loadOffers(data));
});

export const fetchCommentsAction = createAsyncThunk<
  void,
  { offerId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async ({ offerId }, { dispatch, extra: api }) => {
  const { data } = await api.get<CommentType[]>(
    `${APIRoute.Comments}/${offerId}`
  );
  dispatch(loadComments(data));
});

export const fetchChosenOfferAction = createAsyncThunk<
  void,
  { offerId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchChosenOffer', async ({ offerId }, { dispatch, extra: api }) => {
  const { data } = await api.get<ChosenOfferType>(
    `${APIRoute.Offers}/${offerId}`
  );
  dispatch(fetchChosenOffer(data));
});

export const fetchOffersNearbyAction = createAsyncThunk<
  void,
  { offerId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffersNearby', async ({ offerId }, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferNearby[]>(
    `${APIRoute.Offers}/${offerId}/nearby`
  );
  dispatch(fetchOffersNearby(data));
});

export const fetchFavoritesAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavorites', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<CardType[]>(APIRoute.Favorites);
  dispatch(fetchFavorites(data));
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
  async ({ offerId, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<ChosenOfferType>(
      `${APIRoute.Favorites}/${offerId}/${status}`,
      { status }
    );
    dispatch(changeFavoriteStatus(data));
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
  try {
    await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

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
    const { data } = await api.post<CommentType>(
      `${APIRoute.Comments}/${offerId}`,
      { comment, rating }
    );
    dispatch(postComment(data));
  }
);

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
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
