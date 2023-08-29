import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { NameSpace } from '../../const';
import { filterByCity } from '../../store/cities-data/cities-data';

type TabItemProps = {
  cityName: string;
};

function TabItem({ cityName }: TabItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state[NameSpace.Data].city);
  const isActive = city.name === cityName;

  function handleTabClick() {
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
