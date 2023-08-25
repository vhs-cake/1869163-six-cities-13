import OfferGalleryItem from './offer-gallery-item';

type OfferGalleryProps = {
  offerImagesUrls: string[] | undefined;
};

function OfferGallery({ offerImagesUrls }: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery">
      {offerImagesUrls?.map((imgUrl) => (
        <OfferGalleryItem key={imgUrl} imgUrl={imgUrl} />
      ))}
    </div>
  );
}

export default OfferGallery;
