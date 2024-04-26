import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth-service/auth.service';
import { response } from 'express';
import { error } from 'console';
import { NotificationService } from '../../services/notification-service/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    username: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  get firstName() {
    return this.registerForm.controls['firstName'];
  }

  get lastName() {
    return this.registerForm.controls['lastName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get username() {
    return this.registerForm.controls['username'];
  }

  submit() {
    let obj = { ...this.registerForm.value };

    this.authService.register(obj).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.notificationService.showError('Could not register user!');
      }
    );
  }
}
