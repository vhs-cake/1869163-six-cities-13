import { OfferNearby } from '../../types/offer-nearby';
import OfferNearPlacesItem from './offer-near-places-item';

type OfferNearPlacesListProps = {
  offersNearby: OfferNearby[];
};

function OfferNearPlacesList({
  offersNearby,
}: OfferNearPlacesListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offersNearby.map((offer) => (
        <OfferNearPlacesItem
          key={offer.id}
          previewImage={offer.previewImage}
          title={offer.title}
          type={offer.type}
          price={offer.price}
          isFavorite={offer.isFavorite}
          isPremium={offer.isPremium}
        />
      ))}
    </div>
  );
}

export default OfferNearPlacesList;
