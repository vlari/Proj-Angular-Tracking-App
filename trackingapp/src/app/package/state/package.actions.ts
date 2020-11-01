import { createAction, props } from '@ngrx/store';
import { Package } from 'src/app/shared/models/package.model';

export const loadPendingPackages = createAction(
  'Package - get pending packages'
);

export const loadPendingPackagesSuccess = createAction(
  'Package - get pending packages success',
  props<{ packages: any }>()
);

export const loadPendingPackagesFailure = createAction(
  'Package - get pending packages failure',
  props<{ error: string }>()
);

export const loadPackages = createAction(
  'Package - get pending packages',
  props<{ filter: any }>()
);

export const loadPackagesSuccess = createAction(
  'Package - get pending packages success',
  props<{ filter: any }>()
);

export const loadPackagesFailure = createAction(
  'Package - get pending packages failure',
  props<{ filter: any }>()
);
