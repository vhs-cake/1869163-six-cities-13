import { useEffect } from 'react';
import { useAuthorizationStatus } from './use-authorization-status';
import { fetchFavoritesAction } from '../store/api-actions';
import { useAppDispatch } from '.';

export function useFetchFavorites() {
  const { isAuth } = useAuthorizationStatus();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    dispatch(fetchFavoritesAction());
  }, [dispatch, isAuth]);
}
