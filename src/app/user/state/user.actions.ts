import { Action } from '@ngrx/store';

export enum UserActionTypes {
  MaskUserName = '[User] Mask User Name',
  GetCurrentUser = '[User] Get Current User',
}

export class MaskUserName implements Action {
  readonly type = UserActionTypes.MaskUserName;
  constructor(public payload: boolean) {}
}

export class GetCurrentUser implements Action {
  readonly type = UserActionTypes.GetCurrentUser;
}

export type UserActions = MaskUserName | GetCurrentUser;
