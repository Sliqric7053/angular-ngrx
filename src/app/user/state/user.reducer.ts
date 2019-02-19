import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActionTypes, UserActions } from './user.actions';

export interface UserState {
  isUserMasked: boolean;
  currentUser: User;
}

const initialState: UserState = {
  isUserMasked: false,
  currentUser: {
    id: null,
    userName: 'Anonymous',
    isAdmin: false,
  },
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.isUserMasked
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export function reducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        isUserMasked: action.payload,
      };

    case UserActionTypes.GetCurrentUser:
      return {
        ...state,
        currentUser: { ...state.currentUser },
      };

    case UserActionTypes.SetUser:
      return {
        ...state,
        currentUser: { ...action.payload },
      };

    default:
      return state;
  }
}
