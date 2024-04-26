import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

export const forumsGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let user = authService.getUser();
  if (
    authService.isLoggedIn &&
    (user.role === 'forum_member' ||
      user.role === 'administrator' ||
      user.role === 'moderator')
  ) {
    return true;
  } else {
    return false;
  }
};
