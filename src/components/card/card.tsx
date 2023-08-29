import { memo } from 'react';
import { Link } from 'react-router-dom';
import { CardType } from '../../types/offer';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
import { useAppDispatch } from '../../hooks';
import classNames from 'classnames';
import { setActiveCard } from '../../store/cities-process/cities-process';
import StarRating from '../star-rating/star-rating';
import { changeFavoriteStatusAction } from '../../store/api-actions';

type CardProps = {
  card: CardType;
};

function Card({ card }: CardProps): JSX.Element {
  const { isAuth, isNoAuth } = useAuthorizationStatus();
  const {
    isFavorite,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
    id,
  } = card;

  const dispatch = useAppDispatch();

  function handleMouseOver() {
    dispatch(setActiveCard(card));
  }

  return (
    <article onMouseOver={handleMouseOver} className="cities__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          {isAuth && (
            <button
              onClick={() => {
                dispatch(changeFavoriteStatusAction(card));
              }}
              className={classNames('place-card__bookmark-button button', {
                'place-card__bookmark-button--active': isFavorite,
              })}
              type="button"
            >
              <svg className="place-card__bookmark-icon" width={18} height={19}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          )}
          {isNoAuth && (
            <Link className="place-card__bookmark-button button" to="/login">
              <svg className="place-card__bookmark-icon" width={18} height={19}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </Link>
          )}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <StarRating rating={rating} />
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

const CardMemo = memo(Card);

export default CardMemo;
