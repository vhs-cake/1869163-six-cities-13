import StarRating from '../star-rating/star-rating';
import { getFormattedDate } from './utils';

type ReviewItemProps = {
  name: string;
  avatarUrl: string;
  commentText: string;
  rating: number;
  commentDate: string;
};

function ReviewItem({
  name,
  avatarUrl,
  commentText,
  rating,
  commentDate,
}: ReviewItemProps) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <StarRating rating={rating} />
          </div>
        </div>
        <p className="reviews__text">{commentText}</p>
        <time className="reviews__time" dateTime="2019-04-24">
          {getFormattedDate(commentDate)}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
