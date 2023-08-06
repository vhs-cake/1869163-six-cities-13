import { createAction } from '@reduxjs/toolkit';

export const Action = {
  FILTER_BY_CITY: 'FILTER_BY_CITY',
  RESET_SORT: 'RESET_SORT',
  SORT_PRICE_LOW_TO_HIGH: 'SORT_PRICE_LOW_TO_HIGH',
  SORT_PRICE_HIGH_TO_LOW: 'SORT_PRICE_HIGH_TO_LOW',
  SORT_BY_RATING: 'SORT_BY_RATING',
};

export const filterByCityAction = createAction(
  Action.FILTER_BY_CITY,
  (value: string) => ({
    payload: value,
  })
);

export const sortPriceLowToHighAction = createAction(
  Action.SORT_PRICE_LOW_TO_HIGH
);

export const sortPriceHighToLowAction = createAction(
  Action.SORT_PRICE_HIGH_TO_LOW
);

export const sortByRatingAction = createAction(Action.SORT_BY_RATING);

export const resetSortAction = createAction(Action.RESET_SORT);
