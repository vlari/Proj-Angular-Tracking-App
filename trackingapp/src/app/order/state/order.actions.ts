import { createAction, props } from '@ngrx/store';
import { Package } from 'src/app/shared/models/package.model';

export const getAddedPackages = createAction(
  'Order - add package to order',
  props<{ packages: Package[] }>()
);

export const addPackage = createAction(
  'Order - add package to order',
  props<{ package: Package }>()
);

export const removePackage = createAction(
  'Order - delete package from order',
  props<{ trackingNumber: any }>()
);
