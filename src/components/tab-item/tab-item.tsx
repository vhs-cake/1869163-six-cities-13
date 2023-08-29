import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { NameSpace } from '../../const';
import {
  filterByCity,
  setActiveCityName,
} from '../../store/cities-data/cities-data';

type TabItemProps = {
  cityName: string;
};

function TabItem({ cityName }: TabItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCityName = useAppSelector(
    (state) => state[NameSpace.Data].activeCityName
  );
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
