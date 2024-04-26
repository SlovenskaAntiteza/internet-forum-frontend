import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';

interface City {
  name: string;
  value: string;
}

interface Role {
  name: string;
  value: string;
}

@Component({
  selector: 'app-pom',
  standalone: true,
  imports: [
    ChipsModule,
    FormsModule,
    DropdownModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pom.component.html',
  styleUrl: './pom.component.css',
})
export class PomComponent implements OnInit {
  permissions: string[] = [];

  allPermissions: City[] | undefined;

  selectedPermission: City | undefined;

  roles: Role[] = [];

  selectedRole: Role | undefined;

  constructor() {}

  ngOnInit(): void {
    this.permissions = [];

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

  addPermission() {
    if (this.selectedPermission) {
      let item = this.permissions.filter(
        (elem) => elem === this.selectedPermission?.value
      );

      if (item.length === 0) {
        this.permissions.push(this.selectedPermission.value);
      }
    }
  }

  removePermission(permission: string) {
    this.permissions = this.permissions.filter((elem) => elem !== permission);
  }

  setRole() {}
}
