import * as AppState from '../../state/app.state';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { Package } from 'src/app/shared/models/package.model';

export interface State extends AppState.State {
    order: OrderState;
}

export interface OrderState {
    orderPackages: Package[];
}

const initialState: OrderState = {
    orderPackages: []
}

const getPackageFeatureState = createFeatureSelector<OrderState>('packages');

export const getOrderPackages = createSelector(
    getPackageFeatureState,
    state => state.orderPackages
);

export const orderReducer = createReducer<OrderState>(
    initialState,
    on(OrderActions.addPackage, (state, action): OrderState => {
        return {
            ...state,
            orderPackages: [ ...state.orderPackages, action.package]
        }
    }),
    on(OrderActions.deletePackage, (state, action): OrderState => {
        const packageList = state.orderPackages.filter(p => {
            return p.trackingNumber !== action.trackingNumber;
        });
        return {
            ...state,
            orderPackages: packageList
        }
    })
);
