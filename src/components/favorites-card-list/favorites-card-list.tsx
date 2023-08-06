import { CardType } from '../../types/offer';
import FavoritesCard from '../favorites-card/favorites-card';

type FavoritesCardListProps = {
  cardsData: CardType[];
};

function FavoritesCardList({ cardsData }: FavoritesCardListProps): JSX.Element {
  const favoriteCards = cardsData.filter((card) => card.isFavorite);

  return (
    <div className="favorites__places">
      {favoriteCards.map((card) => (
        <FavoritesCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default FavoritesCardList;
