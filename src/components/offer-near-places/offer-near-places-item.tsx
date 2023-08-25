import classNames from 'classnames';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
import { Link } from 'react-router-dom';
import StarRating from '../star-rating/star-rating';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveCard } from '../../store/cities-process/cities-process';
import { CardType } from '../../types/offer';
import { handleAddToFavorites } from '../favorites-card/utils';
import { NameSpace } from '../../const';

type OfferNearPlacesItemProps = {
  previewImage: string;
  title: string;
  type: string;
  price: number;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  card: CardType;
};

function OfferNearPlacesItem({
  previewImage,
  title,
  type,
  price,
  isFavorite,
  isPremium,
  rating,
  card,
}: OfferNearPlacesItemProps): JSX.Element {
  const activeCard = useAppSelector(
    (state) => state[NameSpace.Cities].activeCard
  );
  const { isAuth, isUnknown, isNoAuth } = useAuthorizationStatus();
  const dispatch = useAppDispatch();

  function handleMouseOver() {
    dispatch(setActiveCard(card));
  }

  return (
    <article
      onMouseOver={handleMouseOver}
      className="near-places__card place-card"
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="near-places__image-wrapper place-card__image-wrapper">
        {activeCard && (
          <Link to={`/offer/${activeCard.id}`}>
            <img
              className="place-card__image"
              src={previewImage}
              width={260}
              height={200}
              alt="Place image"
            />
          </Link>
        )}
        {!activeCard && (
          <a href="#">
            <img
              className="place-card__image"
              src={previewImage}
              width={260}
              height={200}
              alt="Place image"
            />
          </a>
        )}
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
                handleAddToFavorites(card);
              }}
              className={classNames('place-card__bookmark-button button', {
                'place-card__bookmark-button--active': isFavorite,
              })}
              type="button"
            >
              <svg className="place-card__bookmark-icon" width={18} height={19}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
          )}
          {isNoAuth && (
            <Link
              to="/login"
              className="place-card__bookmark-button button"
              type="button"
            >
              <svg className="place-card__bookmark-icon" width={18} height={19}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </Link>
          )}
          {isUnknown && (
            <Link
              to="/login"
              className="place-card__bookmark-button button"
              type="button"
            >
              <svg className="place-card__bookmark-icon" width={18} height={19}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </Link>
          )}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <StarRating rating={rating} />
          </div>
        </div>
        <h2 className="place-card__name">
          {activeCard && <Link to={`/offer/${activeCard.id}`}>{title}</Link>}
          {!activeCard && <a href="#">{title}</a>}
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferNearPlacesItem;
