import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { citiesData } from './cities-data/cities-data';
import { citiesProcess } from './cities-process/cities-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: citiesData.reducer,
  [NameSpace.Cities]: citiesProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
