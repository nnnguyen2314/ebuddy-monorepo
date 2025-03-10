import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { axiosErrorHandler, ServerError } from '@/shared/store/helpers';
import { RootState } from '@/shared/store';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/shared/config/firebaseConfig';
import { logout, setUser } from '@/features/auth/store/auth.slice';

const requestErrorCatcher = (err: any, handler: { dispatch: any; rejectWithValue: any }) => {
  axiosErrorHandler(err, handler.dispatch);

  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<ServerError>;
    return handler.rejectWithValue(axiosError.response?.data.messages as string);
  } else {
    const error = err as Error;
    return handler.rejectWithValue(error.message as string);
  }
};

export const doLogin = createAsyncThunk<
  any,
  { auth: any; email: string; password: string },
  { state: RootState }
>('auth/login', async (param, { rejectWithValue, dispatch }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      param.auth,
      param.email,
      param.password
    );
    const user = { ...userCredential.user };
    return user;
  } catch (err) {
    requestErrorCatcher(err, { dispatch, rejectWithValue });
  }
});

export const listenForAuthChanges = createAsyncThunk<any, { state: RootState }>(
  'auth/listenForAuthChanges',
  async (_, { dispatch }) => {
    return new Promise<any | null>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser(user)); // ✅ Store user in Redux
          resolve(user);
        } else {
          dispatch(logout());
          resolve(null);
        }
      });
    });
  }
);
