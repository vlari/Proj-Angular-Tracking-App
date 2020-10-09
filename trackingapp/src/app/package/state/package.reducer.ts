import * as AppState from '../../state/app.state';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as PackageActions from './package.actions';


// Models

export interface State {
    packages: PackageState;
}

export interface PackageState {
    packages: [];
}

const initialState: PackageState = {
    packages: []
}

// Selectors
const getPackageFeatureState = createFeatureSelector<PackageState>('packages');

export const getPackages = createSelector(
    getPackageFeatureState,
    state => state.packages
);

export const packageReducer = createReducer<PackageState>(
    initialState,
    on(PackageActions.getPendingPackagesSuccess, (state, action): PackageState => {
        return {
            ...state,
            packages: action.packages
        }
    })
);
