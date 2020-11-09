import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../shared/models/user.model';
import * as AppState from '../../state/app.state';

// export interface State extends  AppState.State {
//     user: AuthState
// }

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

// Selectors
const getUserFeatureState = createFeatureSelector<AuthState>('user');

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.user
);

export const authReducer = createReducer<AuthState>(
  initialState,
  on(
    AuthActions.loadUserSuccess,
    (state, action): AuthState => {
      return {
        ...state,
        user: action.user,
      };
    }
  ),
  on(
    AuthActions.deleteSession,
    (state): AuthState => {
      return {
        ...state,
        user: null,
      };
    }
  )
);
