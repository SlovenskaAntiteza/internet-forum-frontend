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
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { DialogModule } from 'primeng/dialog';
import { Comment } from '../../domain/comment';
import { UserService } from '../../services/user-service/user.service';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-forum-comments',
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
    DialogModule,
  ],
  templateUrl: './forum-comments.component.html',
  styleUrl: './forum-comments.component.css',
})
export class ForumCommentsComponent implements OnInit {
  forumId: any;
  userPermissions: string[] = [];

  comments: Comment[] = [];

  visibleAddModule: boolean = false;
  enteredComment: string = '';

  visibleEditModule: boolean = false;
  editedComment!: Comment;
  commentToEdit: string = '';

  user: any;

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.forumId = this.route.snapshot.paramMap.get('id');
    this.userPermissions = this.userService.getUserPermissions();
    this.user = this.authService.getUser();
    this.loadComments();
    this.editedComment = {};
  }

  loadComments() {
    this.forumService.findAllCommentsForForum(this.forumId).subscribe(
      (response: any) => {
        this.comments = response;
      },
      (error) => {}
    );
  }

  hasAddCommentPermission() {
    return this.userPermissions.includes('add');
  }

  hasDeleteCommentPermission() {
    return this.userPermissions.includes('delete');
  }

  hasEditCommentPermission() {
    return this.userPermissions.includes('edit');
  }

  deleteComment(comment: any) {
    this.forumService.deleteComment(comment.id).subscribe(
      (response) => {
        this.comments = this.comments.filter((elem) => elem.id !== comment.id);
      },
      (error) => {}
    );
  }

  editComment() {
    if (this.commentToEdit !== '') {
      let obj = {
        id: this.editedComment.id,
        comment: this.commentToEdit,
      };
      this.forumService.editComment(obj).subscribe(
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

  addComment() {
    if (this.enteredComment !== '') {
      // treba koristiti pravi korisnikov id
      let obj = {
        userId: this.user.id,
        forumId: this.forumId,
        comment: this.enteredComment,
      };
      this.forumService.addComment(obj).subscribe(
        (response) => {
          this.loadComments();
        },
        (error) => {}
      );
    }

    this.visibleAddModule = false;
    this.enteredComment = '';
  }

  showAddModule() {
    this.visibleAddModule = true;
  }

  showEditModule(comment: any) {
    this.visibleEditModule = true;
    this.editedComment = comment;
    this.commentToEdit = this.editedComment.comment as string;
  }
}
