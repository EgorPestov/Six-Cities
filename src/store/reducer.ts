import { createReducer } from '@reduxjs/toolkit';
import { setActiveCity, setSortType, setOffers, setFullOffers, loadOffers, requireAuthorization } from './action';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import { offers } from '../mocks/offers';
import { fullOffers } from '../mocks/full-offers';
import { AuthorizationStatus } from '../const';

export type InitialStateType = {
  activeCity: string | undefined;
  offers: OfferType[];
  fullOffers: FullOfferType[];
  activeSortType: string;
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialStateType = {
  activeCity: 'Paris',
  offers: offers,
  fullOffers: fullOffers,
  activeSortType: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.activeSortType = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setFullOffers, (state, action) => {
      state.fullOffers = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
