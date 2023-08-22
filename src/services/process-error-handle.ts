import { clearErrorAction } from '../store/api-actions';
import { setError } from '../store/cities-process/cities-process';
import { AppDispatch } from '../types/state';

export const processErrorHandle = (
  message: string,
  dispatch: AppDispatch
): void => {
  dispatch(setError(message));
  dispatch(clearErrorAction());
};
