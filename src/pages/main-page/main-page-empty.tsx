import { useAppSelector } from '../../hooks';
import { NameSpace } from '../../const';

function MainPageEmpty(): JSX.Element {
  const activeCityName = useAppSelector(
    (state) => state[NameSpace.Data].activeCityName
  );

  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in{' '}
            {activeCityName}
          </p>
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map" />
      </div>
    </div>
  );
}

export default MainPageEmpty;
