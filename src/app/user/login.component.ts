import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

import { Store, select } from '@ngrx/store';
import * as fromUserState from '../user/state';
import * as userActions from './state/user.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromUserState.UserState>
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(fromUserState.getMaskUserName))
      .subscribe(userMasked => {
        this.maskUserName = userMasked;
      });
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new userActions.MaskUserName(value));
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);
      this.store.dispatch(
        new userActions.SetUser({
          id: Math.floor(Math.random() * 1000),
          userName: userName,
          isAdmin: false,
        })
      );

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
