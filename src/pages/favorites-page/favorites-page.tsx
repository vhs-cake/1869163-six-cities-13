import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import FavoritesCardList from '../../components/favorites-card/favorites-card-list';
import Navigation from '../../components/nav/nav';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { NameSpace } from '../../const';
import FavoritesPageEmpty from './favorites-page-empty';
import FavoritesTabs from './favorites-tabs';
import { useEffect, useMemo } from 'react';
import { filterFavoritesByCity } from '../../store/cities-data/cities-data';

function FavoritesPage(): JSX.Element {
  const favoriteCards = useAppSelector(
    (state) => state[NameSpace.Data].favoriteCards
  );
  const dispatch = useAppDispatch();

  const cities = useMemo(
    () => [...new Set(favoriteCards.map((card) => card.city.name))],
    [favoriteCards]
  );

  useEffect(() => {
    dispatch(filterFavoritesByCity(cities[0]));
  }, [cities, dispatch]);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Your favorites</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <Navigation favoriteCards={favoriteCards} />
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        {favoriteCards.length === 0 && <FavoritesPageEmpty />}
        {favoriteCards.length !== 0 && (
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <FavoritesTabs cities={cities} />
                  </div>
                  <div className="favorites__places">
                    <FavoritesCardList />
                  </div>
                </li>
              </ul>
            </section>
          </div>
        )}
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
