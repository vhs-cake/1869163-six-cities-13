import { useAppDispatch } from '../../hooks';
import { filterFavoritesByCity } from '../../store/cities-data/cities-data';

type FavoritesTabItemProps = {
  cityName: string;
};

function FavoritesTabItem({ cityName }: FavoritesTabItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  function handleFavoritesTabClick() {
    dispatch(filterFavoritesByCity(cityName));
  }

  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link">
          <span onClick={handleFavoritesTabClick}>{cityName}</span>
        </a>
      </div>
    </div>
  );
}

export default FavoritesTabItem;
