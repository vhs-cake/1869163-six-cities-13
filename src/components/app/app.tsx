import { Route, Routes } from 'react-router-dom';
import { AppRoute, NameSpace } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import LoginRoute from '../private-route/login-route';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
import ErrorScreen from '../../pages/error-screen/error-screen';
import { useEffect } from 'react';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';
import { useFetchFavorites } from '../../hooks/use-fetch-favorites';

function App(): JSX.Element {
  const { isUnknown } = useAuthorizationStatus();
  const hasError = useAppSelector((state) => state[NameSpace.Data].hasError);
  const isOffersDataLoading = useAppSelector(
    (state) => state[NameSpace.Data].isOffersDataLoading
  );
  const cardsNumber = useAppSelector(
    (state) => state[NameSpace.Data].cards?.length
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cardsNumber) {
      return;
    }

    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [cardsNumber, dispatch]);

  useFetchFavorites();

  if (isUnknown || isOffersDataLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <ErrorScreen />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<MainPage />} />
          <Route
            path={AppRoute.Login}
            element={
              <LoginRoute>
                <LoginPage />
              </LoginRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={<OfferPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
