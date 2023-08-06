import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterByCityAction } from '../../store/action';

type TabItemProps = {
  cityName: string;
};

function TabItem({ cityName }: TabItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.city);
  const isActive = city.name === cityName;

  return (
    <li className="locations__item">
      <a
        className={classNames('locations__item-link tabs__item', {
          'tabs__item--active': isActive,
        })}
      >
        <span onClick={() => dispatch(filterByCityAction(cityName))}>
          {cityName}
        </span>
      </a>
    </li>
  );
}

export default TabItem;
