import { CardType } from '../../types/offer';
import Card from '../card/card';

type CardListProps = {
  cardsData: CardType[];
};

function CardList({ cardsData }: CardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {cardsData.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default CardList;
