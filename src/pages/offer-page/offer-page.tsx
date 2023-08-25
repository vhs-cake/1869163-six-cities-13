import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import { Link, useParams } from 'react-router-dom';
import ReviewForm from '../../components/review/review-form';
import ReviewList from '../../components/review/review-list';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
import Navigation from '../../components/nav/nav';
import {
  fetchChosenOfferAction,
  fetchOffersNearbyAction,
} from '../../store/api-actions';
import { useEffect } from 'react';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferGoodsList from '../../components/offer-goods/offer-goods-list';
import OfferNearPlacesList from '../../components/offer-near-places/offer-near-places-list';
import classNames from 'classnames';
import { NameSpace, Setting } from '../../const';
import StarRating from '../../components/star-rating/star-rating';
import { handleAddToFavorites } from '../../components/favorites-card/utils';

function OfferPage(): JSX.Element {
  const initialComments = useAppSelector(
    (state) => state[NameSpace.Data].initialComments
  );
  const favoriteCards = useAppSelector(
    (state) => state[NameSpace.Data].favoriteCards
  );
  const chosenOffer = useAppSelector(
    (state) => state[NameSpace.Data].chosenOffer
  );
  const offersNearby = useAppSelector(
    (state) => state[NameSpace.Data].offersNearby
  );

  const dispatch = useAppDispatch();
  const { isAuth, isUnknown, isNoAuth } = useAuthorizationStatus();
  const id = useParams().id || '';

  useEffect(() => {
    dispatch(fetchChosenOfferAction({ offerId: id }));
    dispatch(fetchOffersNearbyAction({ offerId: id }));
  }, [dispatch, id]);

  const randomMapPoints = [...offersNearby]
    .sort(() => Math.random() - 0.5)
    .slice(0, Setting.OfferMapPointsCount);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Chosen offer</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <Navigation favoriteCards={favoriteCards} />
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        {chosenOffer && (
          <section className="offer">
            <div className="offer__gallery-container container">
              <OfferGallery offerImagesUrls={chosenOffer.images} />
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {chosenOffer.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{chosenOffer.title}</h1>
                  {isAuth && (
                    <button
                      onClick={() => handleAddToFavorites(chosenOffer)}
                      className={classNames('offer__bookmark-button button', {
                        'offer__bookmark-button--active':
                          chosenOffer.isFavorite,
                      })}
                      type="button"
                    >
                      <svg
                        className="offer__bookmark-icon"
                        width={31}
                        height={33}
                      >
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  )}
                  {isNoAuth && (
                    <Link
                      to="/login"
                      className="offer__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="offer__bookmark-icon"
                        width={31}
                        height={33}
                      >
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </Link>
                  )}
                  {isUnknown && (
                    <Link
                      to="/login"
                      className="offer__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="offer__bookmark-icon"
                        width={31}
                        height={33}
                      >
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </Link>
                  )}
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    {chosenOffer && <StarRating rating={chosenOffer.rating} />}
                  </div>
                  <span className="offer__rating-value rating__value">
                    {chosenOffer.rating}
                  </span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {chosenOffer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {chosenOffer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {chosenOffer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{chosenOffer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&aposs inside</h2>
                  <OfferGoodsList goods={chosenOffer.goods} />
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div
                      className={classNames(
                        'offer__avatar-wrapper user__avatar-wrapper',
                        {
                          'offer__avatar-wrapper--pro': chosenOffer.host.isPro,
                        }
                      )}
                    >
                      <img
                        className="offer__avatar user__avatar"
                        src={chosenOffer.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">
                      {chosenOffer.host.name}
                    </span>
                    {chosenOffer.host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{chosenOffer.description}</p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews ·{' '}
                    <span className="reviews__amount">
                      {initialComments.length}
                    </span>
                  </h2>
                  <ReviewList offerId={id} />
                  {isAuth && <ReviewForm offerId={id}></ReviewForm>}
                </section>
              </div>
            </div>
            {chosenOffer && (
              <section className="offer__map map">
                <Map
                  city={chosenOffer.city}
                  cards={randomMapPoints}
                  activeCard={null}
                  chosenOffer={chosenOffer}
                />
              </section>
            )}
          </section>
        )}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OfferNearPlacesList offersNearby={offersNearby} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
