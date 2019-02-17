import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return {
        ...state,
        isUserMasked: action.payload,
      };
    default:
      return state;
  }
}
