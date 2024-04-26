import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public loggedInUserSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  loggedInUserId = this.loggedInUserSubject.asObservable();

  public setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  get isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  public getUser(): any {
    if (typeof sessionStorage !== 'undefined' && sessionStorage) {
      let user = sessionStorage.getItem(config.SESSION_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }

    return null;
  }

  public setUser(user: any) {
    if (typeof sessionStorage !== 'undefined' && sessionStorage) {
      this.setLoggedIn(true);
      sessionStorage.setItem(config.TOKEN, user.token);
      sessionStorage.setItem(config.SESSION_KEY, JSON.stringify(user));
    }
  }

  public logout() {
    this.loggedIn.next(false);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  private registerUserUrl = config.ROOT_PATH + 'auth/register';
  private loginUserUrl = config.ROOT_PATH + 'auth/login';
  private confirmLoginUrl = config.ROOT_PATH + 'auth/confirm-login';
  private githubLoginUrl = config.ROOT_PATH + 'auth/github/login';

  constructor(private http: HttpClient, private router: Router) {}

  public register(request: any) {
    return this.http.post(this.registerUserUrl, request);
  }

  public login(request: any) {
    return this.http.post(this.loginUserUrl, request);
  }

  public confirmLogin(request: any) {
    return this.http.post(this.confirmLoginUrl, request);
  }

  public loginWithGithub(code: any) {
    let url = this.githubLoginUrl + `?code=${code}`;
    return this.http.post(url, null);
  }
}
