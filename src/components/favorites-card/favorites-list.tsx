import { memo } from 'react';
import FavoritesLocationsMemo from '../favorites-locations/favorites-locations';
import { useFetchFavorites } from '../../hooks/use-fetch-favorites';

type FavoritesListProps = {
  cities: string[];
};

function FavoritesList({ cities }: FavoritesListProps): JSX.Element {
  useFetchFavorites();

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
