import * as AppState from '../../state/app.state';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { Package } from 'src/app/shared/models/package.model';

export interface State extends AppState.State {
    order: OrderState;
}

export interface OrderState {
    selectedPackages: Package[];
}

const initialState: OrderState = {
    selectedPackages: []
}

const getOrderFeatureState = createFeatureSelector<OrderState>('order');

export const getSelectedPackages = createSelector(
    getOrderFeatureState,
    state => state.selectedPackages
);

export const orderReducer = createReducer<OrderState>(
    initialState,
    on(OrderActions.addPackage, (state, action): OrderState => {
        return {
            ...state,
            selectedPackages: [ ...state.selectedPackages, action.package]
        }
    }),
    on(OrderActions.removePackage, (state, action): OrderState => {
        const packageList = state.selectedPackages.filter(p => {
            return p.trackingNumber != action.trackingNumber;
        });
        return {
            ...state,
            selectedPackages: packageList
        }
    })
);
