import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service/forum.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { Comment } from '../../domain/comment';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    DropdownModule,
    TagModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    DialogModule,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  visibleEditModule: boolean = false;
  editedComment!: Comment;
  commentToEdit: string = '';

  constructor(
    private forumService: ForumService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.forumService.findAllNotApproved().subscribe(
      (response: any) => {
        this.comments = response;
      },
      (error) => {}
    );
  }

  showEditModal(comment: any) {
    this.visibleEditModule = true;
    this.editedComment = comment;
    this.commentToEdit = this.editedComment.comment as string;
  }

  editComment() {
    if (this.commentToEdit !== '') {
      let obj = {
        id: this.editedComment.id,
        comment: this.commentToEdit,
      };
      this.forumService.editNotApprovedComment(obj).subscribe(
        (response) => {
          this.loadComments();
          this.editedComment = {};
        },
        (error) => {}
      );
    }
    this.visibleEditModule = false;
    this.commentToEdit = '';
  }

  acceptComment(comment: any) {
    this.forumService.acceptComment(comment.id).subscribe(
      (response) => {
        comment.approved = true;
        this.comments = this.comments.filter((elem) => elem.id !== comment.id);
      },
      (error) => {}
    );
  }

  declineComment(comment: any) {
    this.forumService.declineComment(comment.id).subscribe(
      (response) => {
        this.comments = this.comments.filter((elem) => elem.id !== comment.id);
      },
      (error) => {}
    );
  }
}
