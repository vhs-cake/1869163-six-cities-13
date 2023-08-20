import classNames from 'classnames';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
import { Link } from 'react-router-dom';

type OfferNearPlacesItemProps = {
  previewImage: string;
  title: string;
  type: string;
  price: number;
  isFavorite: boolean;
  isPremium: boolean;
};

function OfferNearPlacesItem({
  previewImage,
  title,
  type,
  price,
  isFavorite,
  isPremium,
}: OfferNearPlacesItemProps): JSX.Element {
  const { isAuth, isUnknown, isNoAuth } = useAuthorizationStatus();

  return (
    <article className="near-places__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          {isAuth && (
            <button
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
            <span style={{ width: '80%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferNearPlacesItem;
