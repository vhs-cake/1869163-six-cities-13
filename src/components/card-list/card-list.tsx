import { CardType } from '../../types/offer';
import Card from '../card/card';

type CardListProps = {
  cardsCount: number;
  cardsData: CardType[];
};

function CardList({ cardsCount, cardsData }: CardListProps): JSX.Element {
  const cardsToRender = cardsData.slice(0, cardsCount);

  return (
    <div className="cities__places-list places__list tabs__content">
      {cardsToRender.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default CardList;
