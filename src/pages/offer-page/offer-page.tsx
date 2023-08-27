import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
import {
  fetchChosenOfferAction,
  fetchOffersNearbyAction,
} from '../../store/api-actions';
import { useEffect } from 'react';
import classNames from 'classnames';
import { NameSpace, Setting } from '../../const';
import { handleAddToFavorites } from '../../components/favorites-card/utils';
import LoadingScreen from '../loading-screen/loading-screen';
import HeaderMemo from '../../components/header/header';
import OfferGalleryMemo from '../../components/offer-gallery/offer-gallery';
import OfferGoodsListMemo from '../../components/offer-goods/offer-goods-list';
import OfferNearPlacesListMemo from '../../components/offer-near-places/offer-near-places-list';
import ReviewFormMemo from '../../components/review/review-form';
import ReviewListMemo from '../../components/review/review-list';
import StarRatingMemo from '../../components/star-rating/star-rating';

function OfferPage(): JSX.Element {
  const initialComments = useAppSelector(
    (state) => state[NameSpace.Data].initialComments
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

  if (!chosenOffer) {
    return <LoadingScreen />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Chosen offer</title>
      </Helmet>
      <HeaderMemo />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            {chosenOffer?.images && (
              <OfferGalleryMemo images={chosenOffer.images} />
            )}
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
                      'offer__bookmark-button--active': chosenOffer.isFavorite,
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
                  <StarRatingMemo rating={chosenOffer.rating} />
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
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <OfferGoodsListMemo goods={chosenOffer.goods} />
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
                <ReviewListMemo offerId={id} />
                {isAuth && <ReviewFormMemo offerId={id}></ReviewFormMemo>}
              </section>
            </div>
          </div>
          {chosenOffer && (
            <section className="offer__map map">
              <Map city={chosenOffer.city} cards={randomMapPoints} />
            </section>
          )}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OfferNearPlacesListMemo offersNearby={offersNearby} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
