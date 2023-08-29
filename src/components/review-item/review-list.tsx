import { useEffect, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction } from '../../store/api-actions';
import ReviewItem from './review-item';
import { NameSpace, Setting } from '../../const';

type ReviewListProps = {
  offerId: string;
};

function ReviewList({ offerId }: ReviewListProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction({ offerId: offerId }));
  }, [dispatch, offerId]);

  const initialComments = useAppSelector(
    (state) => state[NameSpace.Data].initialComments
  );
  return (
    <ul className="reviews__list">
      {initialComments?.slice(0, Setting.ReviewCountMax).map((comment) => (
        <ReviewItem
          key={comment.id}
          name={comment.user.name}
          avatarUrl={comment.user.avatarUrl}
          commentText={comment.comment}
          rating={comment.rating}
          commentDate={comment.date}
        />
      ))}
    </ul>
  );
}

const ReviewListMemo = memo(ReviewList);

export default ReviewListMemo;
