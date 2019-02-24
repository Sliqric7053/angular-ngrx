import { UserActionTypes, UserActions } from './user.actions';
import { UserState } from './index';

const initialState: UserState = {
  isUserMasked: false,
  currentUser: {
    id: null,
    userName: 'Anonymous',
    isAdmin: false,
  },
};

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
