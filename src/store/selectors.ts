import { NameSpace } from '../const';
import { State } from '../types/state';

export const cardsSelector = (state: State) => state[NameSpace.Data].cards;

export const activeCityNameSelector = (state: State) =>
  state[NameSpace.Data].activeCityName;

export const isFavoritesLoadingSelector = (state: State) =>
  state[NameSpace.Data].isFavoritesLoading;
