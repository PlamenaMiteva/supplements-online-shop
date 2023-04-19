import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  loginMode = false;
  loading = false;
  error: string;
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;


    this.loading = true;
    if (this.loginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      error: (errorMessage) => {
        this.error = errorMessage;
        this._snackBar.open(this.error, 'Close', {
          verticalPosition: this.verticalPosition,
        });
        this.loading = false;
      },
      next: (responseData) => {
        console.log(responseData);
        this.loading = false;
        this.router.navigate(['/products']);
      },
    });

    form.reset();
  }
}
