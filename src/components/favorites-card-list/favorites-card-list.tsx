import { useAppSelector } from '../../hooks';
import FavoritesCard from '../favorites-card/favorites-card';

function FavoritesCardList(): JSX.Element {
  const { initialCards } = useAppSelector((state) => state);

  const favoriteCards = initialCards.filter((card) => card.isFavorite);

  return (
    <div className="favorites__places">
      {favoriteCards.map((card) => (
        <FavoritesCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default FavoritesCardList;
