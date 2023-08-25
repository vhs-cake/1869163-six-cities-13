type StarRatingProps = {
  rating: number;
};

function StarRating({ rating }: StarRatingProps): JSX.Element {
  return (
    <>
      <span style={{ width: `${Math.round(rating) * 20}%` }} />
      <span className="visually-hidden">Rating</span>
    </>
  );
}

export default StarRating;
