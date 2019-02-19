import { Action } from '@ngrx/store';
import { User } from '../user';

export enum UserActionTypes {
  MaskUserName = '[User] Mask User Name',
  GetCurrentUser = '[User] Get Current User',
  SetUser = '[User] Set User',
}

export class MaskUserName implements Action {
  readonly type = UserActionTypes.MaskUserName;
  constructor(public payload: boolean) {}
}

export class GetCurrentUser implements Action {
  readonly type = UserActionTypes.GetCurrentUser;
}

export class SetUser implements Action {
  readonly type = UserActionTypes.SetUser;
  constructor(public payload: User) {}
}

export type UserActions = MaskUserName | GetCurrentUser | SetUser;
