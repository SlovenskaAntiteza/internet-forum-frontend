import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ForumService } from '../../services/forum-service/forum.service';
import { response } from 'express';
import { error } from 'console';
import { NotificationService } from '../../services/notification-service/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forums',
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
    ToastModule,
  ],
  templateUrl: './forums.component.html',
  styleUrl: './forums.component.css',
})
export class ForumsComponent implements OnInit {
  forums: any[] = [];

  constructor(
    private forumService: ForumService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forumService.findAllForums().subscribe(
      (response: any) => {
        this.forums = response;
      },
      (error) => {
        this.notificationService.showError(
          'Something went wrong with loading forums!'
        );
      }
    );
  }

  enterArea(forum: any) {
    let url = 'forum-comments/' + `${forum.id}`;
    this.router.navigate([url]);
  }
}
