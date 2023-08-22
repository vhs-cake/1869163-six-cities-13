import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CitiesProcess } from '../../types/state';
import { CardType } from '../../types/offer';

const initialState: CitiesProcess = {
  error: null,
  activeCard: null,
};

export const citiesProcess = createSlice({
  name: NameSpace.Cities,
  initialState,
  reducers: {
    setError(state, { payload }: PayloadAction<string | null>) {
      state.error = payload;
    },
    setActiveCard(state, { payload }: PayloadAction<CardType | null>) {
      state.activeCard = payload;
    },
  },
});

export const { setError, setActiveCard } = citiesProcess.actions;
