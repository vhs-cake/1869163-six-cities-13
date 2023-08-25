import { Link } from 'react-router-dom';
import { CardType } from '../../types/offer';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
import { useAppDispatch, useAppSelector } from '../../hooks';
import classNames from 'classnames';
import { NameSpace } from '../../const';
import { setActiveCard } from '../../store/cities-process/cities-process';
import { handleAddToFavorites } from '../favorites-card/utils';
import StarRating from '../star-rating/star-rating';

type CardProps = {
  card: CardType;
};

function Card({ card }: CardProps): JSX.Element {
  const { isAuth, isUnknown, isNoAuth } = useAuthorizationStatus();
  const activeCard = useAppSelector(
    (state) => state[NameSpace.Cities].activeCard
  );

  const dispatch = useAppDispatch();

  function handleMouseOver() {
    dispatch(setActiveCard(card));
  }

  return (
    <article onMouseOver={handleMouseOver} className="cities__card place-card">
      {card.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        {activeCard && (
          <Link to={`/offer/${activeCard.id}`}>
            <img
              className="place-card__image"
              src={card.previewImage}
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
              src={card.previewImage}
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
            <b className="place-card__price-value">€{card.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          {isAuth && (
            <button
              onClick={() => handleAddToFavorites(card)}
              className={classNames('place-card__bookmark-button button', {
                'place-card__bookmark-button--active': card.isFavorite,
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
          {isUnknown && (
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
            <StarRating rating={card.rating} />
          </div>
        </div>
        {activeCard && (
          <h2 className="place-card__name">
            <Link to={`/offer/${activeCard.id}`}>{card.title}</Link>
          </h2>
        )}
        {!activeCard && (
          <h2 className="place-card__name">
            <a href="#">{card.title}</a>
          </h2>
        )}
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
}

export default Card;
