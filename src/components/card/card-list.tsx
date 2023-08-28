import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import Card from '../card/card';

function CardList(): JSX.Element {
  const cards = useAppSelector((state) => state[NameSpace.Data].cards);

  return (
    <div className="cities__places-list places__list tabs__content">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default CardList;
