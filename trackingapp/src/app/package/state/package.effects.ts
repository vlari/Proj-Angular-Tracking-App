import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { PackageDataService } from '../package-data.service';
import * as PackageActions from '../state/package.actions';

@Injectable()
export class PackageEffect {
  constructor(
    private actions: Actions,
    private packageDataService: PackageDataService
  ) {}

  getPackages = createEffect(() => {
    return this.actions.pipe(
      ofType(PackageActions.loadPendingPackages),
      mergeMap(() =>
        this.packageDataService
          .getPendingPackages()
          .pipe(
            map( packages => PackageActions.loadPendingPackagesSuccess({ packages }))
          )
      )
    );
  });
}
