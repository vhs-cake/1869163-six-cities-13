import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
import {
  changeFavoriteStatusAction,
  fetchChosenOfferAction,
  fetchOffersNearbyAction,
} from '../../store/api-actions';
import { useEffect } from 'react';
import classNames from 'classnames';
import { ApartmentType, NameSpace } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import Header from '../../components/header/header';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferNearPlacesList from '../../components/offer-near-places-item/offer-near-places-list';
import ReviewFormMemo from '../../components/review-form/review-form';
import ReviewList from '../../components/review-item/review-list';
import StarRating from '../../components/star-rating/star-rating';
import OfferGoods from '../../components/offer-goods/offer-goods';
import NotFoundPage from '../not-found-page/not-found-page';
import {
  setCurrentComment,
  setCurrentRating,
} from '../../store/cities-process/cities-process';

function OfferPage(): JSX.Element {
  const initialComments = useAppSelector(
    (state) => state[NameSpace.Data].initialComments
  );
  const chosenOffer = useAppSelector(
    (state) => state[NameSpace.Data].chosenOffer
  );
  const isChosenOfferLoading = useAppSelector(
    (state) => state[NameSpace.Data].isChosenOfferLoading
  );
  const randomOffersNearby = useAppSelector(
    (state) => state[NameSpace.Data].randomOffersNearby
  );

  const apartmentType =
    ApartmentType[chosenOffer?.type as keyof typeof ApartmentType];

  const dispatch = useAppDispatch();
  const { isAuth, isNoAuth } = useAuthorizationStatus();
  const id = useParams().id || '';

  useEffect(() => {
    dispatch(fetchChosenOfferAction({ offerId: id }));
    dispatch(setCurrentComment(''));
    dispatch(setCurrentRating(0));
    dispatch(fetchOffersNearbyAction({ offerId: id }));
  }, [dispatch, id]);

  if (isChosenOfferLoading) {
    return <LoadingScreen />;
  }

  if (!chosenOffer) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Chosen offer</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            {chosenOffer?.images && (
              <OfferGallery images={chosenOffer.images} />
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
                    onClick={() => {
                      dispatch(changeFavoriteStatusAction(chosenOffer));
                    }}
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
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <StarRating rating={chosenOffer.rating} />
                </div>
                <span className="offer__rating-value rating__value">
                  {chosenOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {apartmentType}
                </li>
                {chosenOffer.bedrooms !== 1 && (
                  <li className="offer__feature offer__feature--bedrooms">
                    {chosenOffer.bedrooms} Bedrooms
                  </li>
                )}
                {chosenOffer.bedrooms === 1 && (
                  <li className="offer__feature offer__feature--bedrooms">
                    1 Bedroom
                  </li>
                )}
                {chosenOffer.maxAdults !== 1 && (
                  <li className="offer__feature offer__feature--adults">
                    Max {chosenOffer.maxAdults} adults
                  </li>
                )}
                {chosenOffer.maxAdults === 1 && (
                  <li className="offer__feature offer__feature--adults">
                    Max 1 adult
                  </li>
                )}
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{chosenOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <OfferGoods goods={chosenOffer.goods} />
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
                    {initialComments?.length}
                  </span>
                </h2>
                <ReviewList offerId={id} />
                {isAuth && <ReviewFormMemo offerId={id}></ReviewFormMemo>}
              </section>
            </div>
          </div>
          {chosenOffer && randomOffersNearby && (
            <section className="offer__map map">
              <Map
                city={chosenOffer.city}
                cards={randomOffersNearby}
                isOfferPage
              />
            </section>
          )}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            {randomOffersNearby && (
              <OfferNearPlacesList offersNearby={randomOffersNearby} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
