import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthDataService } from '../auth-data.service';
import * as AuthActions from '../state/auth.actions';

@Injectable()
export class AuthEffect {
  constructor(
    private actions: Actions,
    private authDataService: AuthDataService
  ) {}

  getCurrentUser = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActions.loadUser),
      mergeMap(() =>
        this.authDataService.getUser().pipe(
          map((user) => AuthActions.loadUserSuccess({ user })),
          catchError((error) => of(AuthActions.loadUserFailure({ error })))
        )
      )
    );
  });
}
