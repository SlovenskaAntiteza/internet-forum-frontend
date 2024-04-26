import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service/user.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { User } from '../../domain/user';
import { response } from 'express';
import { error } from 'console';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { EditUserResult } from '../../enums/EditUserResult';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TableModule,
    CardModule,
    CommonModule,
    DropdownModule,
    TagModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    EditUserComponent,
    ToastModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users!: User[];
  intensities: any = [];
  roles!: any[];

  showEditUserModal: boolean = false;
  editModalUser!: User;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response;
      },
      (error) => {
        this.notificationService.showError('User can not be load!');
      }
    );
  }

  loadRoles() {
    this.roles = [
      { label: 'ADMINISTRATOR', value: 'administrator' },
      { label: 'MODERATOR', value: 'moderator' },
      { label: 'FORUM_MEMBER', value: 'forum_member' },
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(intensity: string): any {
    switch (intensity.toLowerCase()) {
      case 'forum_member':
        return 'info';
      case 'administrator':
        return 'danger';
      case 'moderator':
        return 'warning';
      default:
        return null;
    }
  }

  approvedUser(user: User) {
    this.userService.approveUser(user.id).subscribe(
      (response) => {
        user.approved = true;
      },
      (error) => {
        this.notificationService.showError('Could not approve user!');
      }
    );
  }

  blockUser(user: User) {
    this.userService.blockUser(user.id).subscribe(
      (response) => {
        user.blocked = true;
      },
      (error) => {
        this.notificationService.showError('Could not block user!');
      }
    );
  }

  activateUser(user: User) {
    this.userService.activate(user.id).subscribe(
      (response) => {
        user.blocked = false;
      },
      (error) => {
        this.notificationService.showError('Could not activate user!');
      }
    );
  }

  showModal(user: User) {
    this.editModalUser = user;
    this.showEditUserModal = true;
  }

  onModalClosed(result: EditUserResult) {
    if (typeof result === 'number' && EditUserResult[result]) {
      switch (result) {
        case EditUserResult.SUCCESS:
          this.notificationService.showSuccess('User successfully edited!');
          setTimeout(() => {
            this.showEditUserModal = false;
          }, 500);
          break;
        case EditUserResult.ERROR:
          this.notificationService.showError('Something went wrong!');
          setTimeout(() => {
            this.showEditUserModal = false;
          }, 500);
          break;
        case EditUserResult.CANCLE:
          setTimeout(() => {
            this.showEditUserModal = false;
          }, 500);
          break;
      }
    } else {
      console.error('Invalid ChangePasswordResult:', result);
    }
  }
}
