type OfferGalleryItemProps = {
  imgUrl: string;
};

function OfferGalleryItem({ imgUrl }: OfferGalleryItemProps): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={imgUrl} alt="Photo studio" />
    </div>
  );
}

export default OfferGalleryItem;
