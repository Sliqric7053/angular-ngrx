import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
    isUserMasked: boolean;
    currentUser: User;
  }

  const getUserFeatureState = createFeatureSelector<UserState>('users');

  export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.isUserMasked
  );

  export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
  );
