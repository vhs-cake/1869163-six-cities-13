import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import CardList from '../../components/card-list/card-list';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  filterByCityAction,
  resetSortAction,
  sortByRatingAction,
  sortPriceHighToLowAction,
  sortPriceLowToHighAction,
} from '../../store/action';
import Tabs from '../../components/tabs/tabs';
import { useEffect } from 'react';

type MainPageProps = {
  cardsCount: number;
};

function MainPage({ cardsCount }: MainPageProps): JSX.Element {
  const { cards, initialCards } = useAppSelector((state) => state);
  const city = useAppSelector((state) => state.city);
  const cities = [...new Set(initialCards.map((card) => card.city.name))];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterByCityAction('Paris'));
  }, []);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities. Main page</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={cities} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {cardsCount} places to stay in Amsterdam
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                    onClick={() => dispatch(resetSortAction())}
                  >
                    Popular
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                    onClick={() => dispatch(sortPriceLowToHighAction())}
                  >
                    Price: low to high
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                    onClick={() => dispatch(sortPriceHighToLowAction())}
                  >
                    Price: high to low
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                    onClick={() => dispatch(sortByRatingAction())}
                  >
                    Top rated first
                  </li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CardList cardsCount={cardsCount} cardsData={cards} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={city} cards={cards} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
