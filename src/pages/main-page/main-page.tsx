import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import CardList from '../../components/card/card-list';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  filterByCity,
  sortByRating,
  sortPriceHighToLow,
  sortPriceLowToHigh,
} from '../../store/cities-data/cities-data';
import { NameSpace } from '../../const';
import MainPageEmpty from './main-page-empty';
import HeaderMemo from '../../components/header/header';
import TabsMemo from '../../components/tabs/tabs';

function MainPage(): JSX.Element {
  const cards = useAppSelector((state) => state[NameSpace.Data].cards);

  const initialCards = useAppSelector(
    (state) => state[NameSpace.Data].initialCards
  );

  const city = useAppSelector((state) => state[NameSpace.Data].city);
  const cities = useMemo(
    () => [...new Set(initialCards.map((card) => card.city.name))],
    [initialCards]
  );

  const [SortOpeningState, setSortOpeningState] = useState(false);
  const [activeSort, setActiveSort] = useState('Popular');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterByCity('Paris'));
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
      <HeaderMemo />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <TabsMemo cities={cities} />
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
                  <CardList />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={city} cards={cards} />
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
