import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  filterByCity,
  setActiveCityName,
} from '../../store/cities-data/cities-data';
import { activeCityNameSelector } from '../../store/selectors';

type TabItemProps = {
  cityName: string;
};

function TabItem({ cityName }: TabItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCityName = useAppSelector(activeCityNameSelector);
  const isActive = activeCityName === cityName;

  function handleTabClick() {
    dispatch(setActiveCityName(cityName));
    dispatch(filterByCity(cityName));
  }

  return (
    <li className="locations__item">
      <a
        className={classNames('locations__item-link tabs__item', {
          'tabs__item--active': isActive,
        })}
      >
        <span onClick={handleTabClick}>{cityName}</span>
      </a>
    </li>
  );
}

export default TabItem;
