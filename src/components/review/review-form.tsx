import { FormEvent } from 'react';
import { Setting } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';
import {
  setCurrentComment,
  setCurrentRating,
} from '../../store/cities-process/cities-process';

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const comment = useAppSelector((state) => state.CITIES.currentComment);
  const rating = useAppSelector((state) => state.CITIES.currentRating);
  const isSubmitting = useAppSelector((state) => state.CITIES.isSubmitting);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch(setCurrentComment(e.target.value));
  }

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment || !rating) {
      return;
    }

    dispatch(postCommentAction({ offerId, comment, rating }));
  };

  const handleRatingInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setCurrentRating(Number(e.target.value)));

  const isCommentValid =
    comment.length >= Setting.ReviewCharactersMin &&
    comment.length <= Setting.ReviewCharactersMax &&
    rating;

  return (
    <form
      onSubmit={handleCommentSubmit}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          checked={rating === 5}
          id="5-stars"
          type="radio"
          onChange={handleRatingInputChange}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          checked={rating === 4}
          id="4-stars"
          type="radio"
          onChange={handleRatingInputChange}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          checked={rating === 3}
          id="3-stars"
          type="radio"
          onChange={handleRatingInputChange}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          checked={rating === 2}
          id="2-stars"
          type="radio"
          onChange={handleRatingInputChange}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          checked={rating === 1}
          id="1-star"
          type="radio"
          onChange={handleRatingInputChange}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {Setting.ReviewCharactersMin} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isCommentValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
