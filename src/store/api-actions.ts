import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../hooks/useAppDispatch/useAppDispatch';
import { State } from '../hooks/useAppSelector/useAppSelector';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import { loadOffers, loadOffer, setOfferLoadStatus, setOffersLoadStatus,
  setNearbyOffersLoadStatus, loadNearbyOffers, setError,
  setReviewsLoadStatus, loadReviews, setAuthorization } from './action';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { ReviewType } from '../components/types/review';
import { saveToken, dropToken } from '../services/token';
import { store } from '.';

export const clearError = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);

type thunkObjType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};

export const fetchOffers = createAsyncThunk<void, undefined, thunkObjType>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadStatus(true));
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setOffersLoadStatus(false));
  }
);

export const fetchOffer = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'fetchOffer',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setOfferLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Offers}/${id}` : '';
    const { data } = await api.get<FullOfferType>(url);
    dispatch(loadOffer(data));
    dispatch(setOfferLoadStatus(false));
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'fetchNearbyOffers',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setNearbyOffersLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Offers}/${id}/nearby` : '';
    const { data } = await api.get<OfferType[]>(url);
    dispatch(loadNearbyOffers(data));
    dispatch(setNearbyOffersLoadStatus(false));
  }
);

export const fetchReviews = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'fetchReviews',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setReviewsLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Comments}/${id}` : '';
    const { data } = await api.get<ReviewType[]>(url);
    dispatch(loadReviews(data));
    dispatch(setReviewsLoadStatus(false));
  }
);

export const checkAuth = createAsyncThunk<void, undefined, thunkObjType>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const login = createAsyncThunk<void, AuthData, thunkObjType>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setAuthorization(AuthorizationStatus.Auth));
  }
);

export const logout = createAsyncThunk<void, undefined, thunkObjType>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorization(AuthorizationStatus.NoAuth));
  }
);
