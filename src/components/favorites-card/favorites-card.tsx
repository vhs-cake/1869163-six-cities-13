import { Link } from 'react-router-dom';
import { CardType } from '../../types/offer';
import { setActiveCard } from '../../store/cities-process/cities-process';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

type FavoritesCardProps = {
  card: CardType;
};

function FavoritesCard({ card }: FavoritesCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleMouseOver = () => {
    dispatch(setActiveCard(card));
  };

  return (
    <article
      onMouseOver={handleMouseOver}
      className="favorites__card place-card"
    >
      {card.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${card.id}`}>
          <img
            className="place-card__image"
            src={card.previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{card.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            onClick={() => {
              dispatch(changeFavoriteStatusAction(card));
            }}
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '100%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/:${card.id}`}>{card.title}</Link>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
}

export default FavoritesCard;
