import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.css',
})
export class DefaultLayoutComponent {}
