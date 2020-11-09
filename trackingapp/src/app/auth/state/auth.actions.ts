import { createAction, props } from '@ngrx/store';

export const loadUser = createAction('Auth - get current user');

export const loadUserSuccess = createAction(
  'Auth - get current user success',
  props<{ user: any }>()
);

export const loadUserFailure = createAction(
  'Auth - get current user failure',
  props<{ error: string }>()
);

export const deleteSession = createAction('Auth - remove current session');
