import { useEffect, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FavoritesCard from './favorites-card';
import { fetchFavoritesAction } from '../../store/api-actions';
import { NameSpace } from '../../const';

function FavoritesCardList(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const filteredFavoriteCards = useAppSelector(
    (state) => state[NameSpace.Data].filteredFavoriteCards
  );

  return (
    <div className="favorites__places">
      {filteredFavoriteCards.map((card) => (
        <FavoritesCard key={card.id} card={card} />
      ))}
    </div>
  );
}

const FavoritesCardListMemo = memo(FavoritesCardList);

export default FavoritesCardListMemo;
