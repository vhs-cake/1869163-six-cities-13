import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FavoritesCard from './favorites-card';
import { fetchFavoritesAction } from '../../store/api-actions';

function FavoritesCardList(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const favoriteCards = useAppSelector((state) => state.favoriteCards);

  return (
    <div className="favorites__places">
      {favoriteCards.map((card) => (
        <FavoritesCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default FavoritesCardList;
