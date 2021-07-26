import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/auth/shared/services/auth/auth.services';


@Component({
  selector: 'login',
  template: `
    <div>
    <auth-form (submitted)="loginUser($event)">
      <h1>Login</h1>
      <a routerLink="/auth/register">Not Registered?</a>
      <button type="submit">
      Login
      </button>
      <div class="error" *ngIf="error">
        {{error}}
      </div>
    </auth-form>
    </div>
  `
})
export class LoginComponent {

  error!: string;
  constructor(
    private authService:AuthService,
    private router:Router,
  ) { }

  async loginUser(event: FormGroup) {
    console.log('VALUES', event.value)

    const { email, password } = event.value;

    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);

    } catch (error) {
      this.error=error.message;

    }

  }
}
