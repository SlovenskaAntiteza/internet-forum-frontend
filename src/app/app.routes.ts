import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmLoginComponent } from './components/confirm-login/confirm-login.component';
import { UsersComponent } from './components/users/users.component';
import { ForumsComponent } from './components/forums/forums.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { PomComponent } from './components/pom/pom.component';
import { ForumCommentsComponent } from './components/forum-comments/forum-comments.component';
import { CommentsComponent } from './components/comments/comments.component';
import { GitcallbackComponent } from './components/gitcallback/gitcallback.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'callback',
    component: GitcallbackComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'forums',
        component: ForumsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'forum-comments/:id',
        component: ForumCommentsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'comments',
        component: CommentsComponent,
        canActivate: [authGuard],
      },
      {
        path: '',
        redirectTo: 'forums',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'confirm-login/:id',
    component: ConfirmLoginComponent,
  },
];
