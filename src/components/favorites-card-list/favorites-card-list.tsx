import { CardType } from '../../types/offer';
import FavoritesCard from '../favorites-card/favorites-card';

type FavoritesCardListProps = {
  cardsCount: number;
  cardsData: CardType[];
};

function FavoritesCardList({
  cardsCount,
  cardsData,
}: FavoritesCardListProps): JSX.Element {
  const cardsToRender = cardsData.slice(0, cardsCount);
  const favoriteCards = cardsToRender.filter((card) => card.isFavorite);

  return (
    <div className="favorites__places">
      {favoriteCards.map((card) => (
        <FavoritesCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default FavoritesCardList;
