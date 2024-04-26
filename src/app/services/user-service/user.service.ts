import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private getAllUsersUrl = config.ROOT_PATH + 'users';
  private usersUrl = config.ROOT_PATH + 'users/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  public canAccessForums() {
    if (this.authService.isLoggedIn) {
      let user = this.authService.getUser();
      if (
        user.role === 'forum_member' ||
        user.role === 'moderator' ||
        user.role === 'administrator'
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public canAccessUsers() {
    if (this.authService.isLoggedIn) {
      let user = this.authService.getUser();
      if (user.role === 'administrator') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public canAccessComments() {
    if (this.authService.isLoggedIn) {
      let user = this.authService.getUser();
      if (user.role === 'moderator' || user.role === 'administrator') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public getUserPermissions() {
    if (this.authService.isLoggedIn) {
      let user = this.authService.getUser();
      return user.permissions;
    }

    return null;
  }

  public getAllUsers() {
    return this.http.get(this.getAllUsersUrl);
  }

  public approveUser(userId: any) {
    let url = this.usersUrl + `${userId}/approve`;
    return this.http.put(url, null);
  }

  public blockUser(userId: any) {
    let url = this.usersUrl + `${userId}/block`;
    return this.http.put(url, null);
  }

  public activate(userId: any) {
    let url = this.usersUrl + `${userId}/unblock`;
    return this.http.put(url, null);
  }

  public updateUserRole(userId: any, role: any) {
    let obj = { id: userId, role: role };
    let url = this.usersUrl + 'change-role';
    return this.http.put(url, obj);
  }

  public updatePermissions(userId: any, permissions: any) {
    let obj = { userId: userId, permissions: permissions };
    let url = this.usersUrl + 'change-permissions';
    return this.http.put(url, obj);
  }
}
