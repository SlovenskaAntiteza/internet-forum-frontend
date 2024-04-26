import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { EditUserResult } from '../../enums/EditUserResult';
import { User } from '../../domain/user';
import { Role } from '../../domain/role';
import { City } from '../../domain/city';
import { UserService } from '../../services/user-service/user.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-edit-user',
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
    DialogModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  @Input() isViewable: boolean = false;
  @Input() user!: User;
  @Output() modalClosed: EventEmitter<any> = new EventEmitter();

  editBtn: boolean = false;

  permissions: string[] = [];

  allPermissions: City[] | undefined;

  selectedPermission: City | undefined;

  roles: Role[] = [];

  selectedRole: Role | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.user.permissions) {
      this.permissions = this.user.permissions.slice();
    }

    this.allPermissions = [
      { name: 'Delete', value: 'delete' },
      { name: 'Add', value: 'add' },
      { name: 'Edit', value: 'edit' },
    ];

    this.roles = [
      { name: 'Administrator', value: 'administrator' },
      { name: 'Moderator', value: 'moderator' },
      { name: 'Forum Member', value: 'forum_member' },
    ];
  }

  resetForm() {
    this.permissions = [];
    this.selectedPermission = undefined;
    this.selectedRole = undefined;
    this.allPermissions = [];
    this.roles = [];
    this.editBtn = false;
  }

  hideModalCancle() {
    this.resetForm();
    this.modalClosed.emit(EditUserResult.CANCLE);
  }

  hideModal(result: EditUserResult) {
    this.resetForm();
    this.modalClosed.emit(result);
  }

  onRoleChange() {
    if (this.user.role !== this.selectedRole?.value) this.editBtn = true;
  }

  addPermission() {
    if (this.selectedPermission) {
      let item = this.permissions.filter(
        (elem) => elem === this.selectedPermission?.value
      );

      if (item?.length === 0) {
        this.permissions.push(this.selectedPermission.value);
      }
    }
    this.editBtn = true;
  }

  removePermission(permission: string) {
    this.permissions = this.permissions?.filter((elem) => elem !== permission);
    this.editBtn = true;
  }

  onSubmit() {
    // first part, need to change role
    if (
      this.selectedRole?.value !== undefined &&
      this.user.role !== this.selectedRole?.value
    ) {
      this.userService
        .updateUserRole(this.user.id, this.selectedRole?.value)
        .subscribe(
          (response) => {
            this.user.role = this.selectedRole?.value;
            this.updatePermissions();
          },
          (error) => {
            console.log('Could not change user role!', error);
            this.hideModal(EditUserResult.ERROR);
          }
        );
    } else {
      this.updatePermissions();
    }
  }

  updatePermissions() {
    if (!this.user.permissions || !this.permissions) {
      console.log('Permissions are not properly initialized.');
      return;
    }

    if (
      this.user.permissions.length !== this.permissions.length ||
      !this.user.permissions.every((elem) => this.permissions.includes(elem))
    ) {
      this.userService
        .updatePermissions(this.user.id, this.permissions)
        .subscribe(
          (response) => {
            this.user.permissions = this.permissions.slice();
            this.hideModal(EditUserResult.SUCCESS);
          },
          (error) => {
            console.log('Could not update user permissions!');
            this.hideModal(EditUserResult.ERROR);
          }
        );
    } else {
      this.hideModal(EditUserResult.CANCLE);
    }
  }
}
