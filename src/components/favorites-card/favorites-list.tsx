import { useEffect, memo } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchFavoritesAction } from '../../store/api-actions';
import FavoritesLocationsMemo from '../favorites-locations/favorites-locations';

type FavoritesListProps = {
  cities: string[];
};

function FavoritesList({ cities }: FavoritesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <FavoritesLocationsMemo key={city} cityName={city} />
      ))}
    </ul>
  );
}

const FavoritesListMemo = memo(FavoritesList);

export default FavoritesListMemo;
