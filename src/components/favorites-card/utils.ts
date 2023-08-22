import { changeFavoriteStatusAction } from '../../store/api-actions';
import { CardType } from '../../types/offer';
import { AppDispatch } from '../../types/state';

export function handleAddToFavorites(card: CardType, dispatch: AppDispatch) {
  const newStatus = card.isFavorite ? 0 : 1;
  dispatch(
    changeFavoriteStatusAction({
      offerId: card.id,
      status: newStatus,
    })
  );
}
