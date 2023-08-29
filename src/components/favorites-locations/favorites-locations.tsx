import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import FavoritesCard from '../favorites-card/favorites-card';
import FavoritesTabItem from '../favorites-tab-item/favorites-tab-item';

type FavoritesLocationsProps = {
  cityName: string;
};

function FavoritesLocations({
  cityName,
}: FavoritesLocationsProps): JSX.Element {
  const favoriteCards = useAppSelector((state) => state.DATA.favoriteCards);
  const filteredFavoriteCards = [...favoriteCards].filter(
    (card) => card.city.name === cityName
  );

  return (
    <li className="favorites__locations-items">
      <FavoritesTabItem cityName={cityName} />
      <div className="favorites__places">
        {filteredFavoriteCards.map((card) => (
          <FavoritesCard key={card.id} card={card} />
        ))}
      </div>
    </li>
  );
}

const FavoritesLocationsMemo = memo(FavoritesLocations);

export default FavoritesLocationsMemo;
