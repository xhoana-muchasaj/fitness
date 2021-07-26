import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/auth/shared/services/auth/auth.services';

@Component({
  selector: 'register',
  template: `
    <div>
    <auth-form (submitted)="registerUser($event)">
    <h1>Register</h1>
    <a routerLink="/auth/login">Already have an account?</a>
    <button type="submit">
    Create account
    </button>
    <div class="error" *ngIf="error">
    {{error}}
    </div>
    </auth-form>
    </div>
  `
})
export class RegisterComponent {

  error!: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async registerUser(event: FormGroup) {
    console.log('VALUES', event.value)

    const { email, password } = event.value;

    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);

    } catch (error) {
      this.error=error.message;

    }

  }
}