import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  if (authService.isLoggedIn) {
    return true;
  } else {
    let router = inject(Router);
    router.navigate(['']);
    return false;
  }
};
