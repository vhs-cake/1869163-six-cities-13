import { CardType } from '../../types/offer';
import OfferNearPlacesItem from './offer-near-places-item';

type OfferNearPlacesListProps = {
  offersNearby: CardType[];
};

function OfferNearPlacesList({
  offersNearby,
}: OfferNearPlacesListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offersNearby.map((offer) => (
        <OfferNearPlacesItem
          key={offer.id}
          card={offer}
          previewImage={offer.previewImage}
          title={offer.title}
          type={offer.type}
          price={offer.price}
          isFavorite={offer.isFavorite}
          isPremium={offer.isPremium}
          rating={offer.rating}
        />
      ))}
    </div>
  );
}

export default OfferNearPlacesList;
