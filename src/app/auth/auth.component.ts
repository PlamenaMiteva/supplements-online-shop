import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode = false;
  loading = false;
  error: string;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private storeSub: Subscription;

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.loading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this._snackBar.open(this.error, 'Close', {
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.loading = true;
    if (this.loginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      // authObs = this.authService.signup(email, password);
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }

    // authObs.subscribe({
    //   error: (errorMessage) => {
    //     this.error = errorMessage;
    //     this._snackBar.open(this.error, 'Close', {
    //       verticalPosition: this.verticalPosition,
    //     });
    //     this.loading = false;
    //   },
    //   next: (responseData) => {
    //     console.log(responseData);
    //     this.loading = false;
    //     this.router.navigate(['/products']);
    //   },
    // });

    form.reset();
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
