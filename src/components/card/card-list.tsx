import { useAppSelector } from '../../hooks';
import { cardsSelector } from '../../store/selectors';
import Card from '../card/card';

function CardList(): JSX.Element {
  const cards = useAppSelector(cardsSelector);

  return (
    <div className="cities__places-list places__list tabs__content">
      {cards?.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default CardList;
