import { memo } from 'react';
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
        <OfferNearPlacesItem key={offer.id} card={offer} />
      ))}
    </div>
  );
}

const OfferNearPlacesListMemo = memo(OfferNearPlacesList);

export default OfferNearPlacesListMemo;
