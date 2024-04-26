import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { config } from '../config/config';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      typeof sessionStorage != 'undefined' &&
      sessionStorage.getItem(config.TOKEN)
    ) {
      let token = sessionStorage.getItem(config.TOKEN);
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          if (
            (event.status === 401 && !event.url?.includes('/auth')) ||
            event.status === 400
          ) {
            console.log(event.status);
            this.authService.logout();
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (
          (error.status === 401 && !error.url?.includes('/auth')) ||
          error.status === 400
        ) {
          console.log(error.status);
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
