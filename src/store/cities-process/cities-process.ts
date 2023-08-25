import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CitiesProcess } from '../../types/state';
import { CardType } from '../../types/offer';
import { postCommentAction } from '../api-actions';

const initialState: CitiesProcess = {
  error: null,
  activeCard: null,
  isSubmitting: false,
  currentComment: '',
  currentRating: 0,
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
    setCurrentComment(state, { payload }: PayloadAction<string>) {
      state.currentComment = payload;
    },
    setCurrentRating(state, { payload }: PayloadAction<number>) {
      state.currentRating = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postCommentAction.pending, (state) => {
        state.isSubmitting = true;
        state.error = '';
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isSubmitting = false;
        state.error = 'Во время отправки формы произошла ошибка :(';
      })
      .addCase(postCommentAction.fulfilled, (state) => {
        state.isSubmitting = false;
        state.currentComment = '';
        state.currentRating = 0;
      });
  },
});

export const { setError, setActiveCard, setCurrentComment, setCurrentRating } =
  citiesProcess.actions;
