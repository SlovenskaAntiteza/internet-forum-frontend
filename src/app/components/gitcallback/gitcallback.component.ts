import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { response } from 'express';
import { error } from 'console';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NotificationService } from '../../services/notification-service/notification.service';

@Component({
  selector: 'app-gitcallback',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './gitcallback.component.html',
  styleUrl: './gitcallback.component.css',
})
export class GitcallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    let code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      this.authService.loginWithGithub(code).subscribe(
        (response: any) => {
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
