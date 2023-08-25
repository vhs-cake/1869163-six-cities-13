import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import CardList from '../../components/card/card-list';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Tabs from '../../components/tabs/tabs';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  filterByCity,
  sortByRating,
  sortPriceHighToLow,
  sortPriceLowToHigh,
} from '../../store/cities-data/cities-data';
import { NameSpace } from '../../const';
import Navigation from '../../components/nav/nav';
import MainPageEmpty from './main-page-empty';

function MainPage(): JSX.Element {
  const cards = useAppSelector((state) => state[NameSpace.Data].cards);
  const chosenOffer = useAppSelector(
    (state) => state[NameSpace.Data].chosenOffer
  );
  const activeCard = useAppSelector(
    (state) => state[NameSpace.Cities].activeCard
  );
  const initialCards = useAppSelector(
    (state) => state[NameSpace.Data].initialCards
  );
  const favoriteCards = useAppSelector(
    (state) => state[NameSpace.Data].favoriteCards
  );
  const city = useAppSelector((state) => state[NameSpace.Data].city);
  const cities = [...new Set(initialCards.map((card) => card.city.name))];

  const [SortOpeningState, setSortOpeningState] = useState(false);
  const [activeSort, setActiveSort] = useState('Popular');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterByCity('Paris'));
    setActiveSort('Popular');
  }, [dispatch]);

  useEffect(() => {
    setActiveSort('Popular');
  }, [city]);

  function handleSortOpening() {
    setSortOpeningState(!SortOpeningState);
  }

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
                <Navigation favoriteCards={favoriteCards} />
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={cities} />
        {cards.length === 0 && <MainPageEmpty city={city} />}
        {cards.length !== 0 && (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {cards.length} places to stay in {city.name}
                </b>
                <form
                  onClick={handleSortOpening}
                  className="places__sorting"
                  action="#"
                  method="get"
                >
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    {activeSort}
                    <svg className="places__sorting-arrow" width={7} height={4}>
                      <use xlinkHref="#icon-arrow-select" />
                    </svg>
                  </span>
                  <ul
                    className={classNames(
                      'places__options places__options--custom',
                      { 'places__options--opened': SortOpeningState }
                    )}
                  >
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                      onClick={() => {
                        dispatch(filterByCity(city.name));
                        setActiveSort('Popular');
                      }}
                    >
                      Popular
                    </li>
                    <li
                      className="places__option"
                      tabIndex={0}
                      onClick={() => {
                        dispatch(sortPriceLowToHigh());
                        setActiveSort('Price: low to high');
                      }}
                    >
                      Price: low to high
                    </li>
                    <li
                      className="places__option"
                      tabIndex={0}
                      onClick={() => {
                        dispatch(sortPriceHighToLow());
                        setActiveSort('Price: high to low');
                      }}
                    >
                      Price: high to low
                    </li>
                    <li
                      className="places__option"
                      tabIndex={0}
                      onClick={() => {
                        dispatch(sortByRating());
                        setActiveSort('Top rated first');
                      }}
                    >
                      Top rated first
                    </li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <CardList cardsData={cards} />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    city={city}
                    cards={cards}
                    activeCard={activeCard}
                    chosenOffer={chosenOffer}
                  />
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainPage;
