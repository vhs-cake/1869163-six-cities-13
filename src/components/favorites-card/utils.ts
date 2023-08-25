import { store } from '../../store';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { ChosenOfferType } from '../../types/chosen-offer';
import { CardType } from '../../types/offer';

export function handleAddToFavorites(card: CardType | ChosenOfferType) {
  const newStatus = card.isFavorite ? 0 : 1;
  store.dispatch(
    changeFavoriteStatusAction({
      offerId: card.id,
      status: newStatus,
    })
  );
}
