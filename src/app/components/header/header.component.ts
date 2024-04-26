import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { config } from '../../config/config';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../domain/user';
import { forumsGuard } from '../../guard/forums.guard';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  sidebarVisible: boolean = false;
  user!: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  isSelected(routerLink: string): boolean {
    return this.router.isActive(routerLink, false);
  }

  getStarted() {
    if (
      typeof sessionStorage !== undefined ||
      sessionStorage.getItem(config.SESSION_KEY) ||
      sessionStorage.getItem(config.TOKEN)
    ) {
      sessionStorage.clear();
    }
    this.router.navigate(['login']);
  }

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.items = this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logOut(),
      },
      {
        label: 'Forums',
        routerLink: 'forums',
        icon: 'pi pi-fw pi-bell',
        visible: this.userService.canAccessForums(),
      },
      {
        label: 'Users',
        routerLink: 'users',
        icon: 'pi pi-fw pi-user',
        visible: this.userService.canAccessUsers(),
      },
      {
        label: 'Comments',
        routerLink: 'comments',
        icon: 'pi pi-fw pi-inbox',
        visible: this.userService.canAccessComments(),
      },
    ];
  }
}
