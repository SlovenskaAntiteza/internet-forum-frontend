import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { config } from '../../config/config';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    NgClass,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  githubUrl = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.githubUrl = config.GITHUB_URL;
  }

  loginWithGithub() {
    window.location.href = this.githubUrl;
  }

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    let obj = { ...this.loginForm.value };

    this.authService.login(obj).subscribe(
      (response: any) => {
        let url = '/confirm-login/' + `${response}`;
        this.router.navigate([url]);
      },
      (error: any) => {
        console.log(error);
        this.notificationService.showError(
          'Something went wrong entering username and password!'
        );
      }
    );
  }
}
