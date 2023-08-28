import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { NameSpace } from '../../const';
import FavoritesPageEmpty from './favorites-page-empty';
import { useMemo } from 'react';
import Header from '../../components/header/header';
import FavoritesListMemo from '../../components/favorites-card/favorites-list';

function FavoritesPage(): JSX.Element {
  const favoriteCards = useAppSelector(
    (state) => state[NameSpace.Data].favoriteCards
  );

  const cities = useMemo(
    () => [...new Set(favoriteCards.map((card) => card.city.name))],
    [favoriteCards]
  );

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Your favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        {favoriteCards.length === 0 && <FavoritesPageEmpty />}
        {favoriteCards.length !== 0 && (
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesListMemo cities={cities} />
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
