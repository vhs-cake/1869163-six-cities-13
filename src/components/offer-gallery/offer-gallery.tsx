import { memo } from 'react';
import OfferGalleryItem from './offer-gallery-item';

type OfferGalleryProps = {
  images: string[];
};

function OfferGallery({ images }: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery">
      {images.map((imgUrl) => (
        <OfferGalleryItem key={imgUrl} imgUrl={imgUrl} />
      ))}
    </div>
  );
}

const OfferGalleryMemo = memo(OfferGallery);

export default OfferGalleryMemo;
