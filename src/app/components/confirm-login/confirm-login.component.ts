import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth-service/auth.service';
import { response } from 'express';
import { error } from 'console';
import { NotificationService } from '../../services/notification-service/notification.service';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-confirm-login',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    RouterModule,
  ],
  templateUrl: './confirm-login.component.html',
  styleUrl: './confirm-login.component.css',
})
export class ConfirmLoginComponent implements OnInit {
  confirmLoginForm = this.fb.group({
    verificationCode: ['', [Validators.required]],
  });

  userId: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  get verificationCode() {
    return this.confirmLoginForm.controls['verificationCode'];
  }

  submit() {
    if (this.userId) {
      let data = { ...this.confirmLoginForm.value, id: this.userId };

      this.authService.confirmLogin(data).subscribe(
        (response) => {
          console.log('User successfully logged in!');
          this.authService.setUser(response);
          this.router.navigate(['/forums']);
        },
        (error) => {
          this.notificationService.showError('Could not confirm user account!');
        }
      );
    }
  }
}
