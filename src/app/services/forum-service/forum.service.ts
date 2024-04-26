import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private forumsUrl = config.ROOT_PATH + 'forums/';

  constructor(private http: HttpClient) {}

  public findAllForums() {
    let url = this.forumsUrl + 'find-all-forums';
    return this.http.get(url);
  }

  public findAllCommentsForForum(forumId: any) {
    let url = this.forumsUrl + `${forumId}/find-all-comments`;
    return this.http.get(url);
  }

  public addComment(comment: any) {
    let url = this.forumsUrl + 'add-comment';
    return this.http.post(url, comment);
  }

  public editComment(comment: any) {
    let url = this.forumsUrl + 'edit-comment';
    return this.http.put(url, comment);
  }

  public deleteComment(commentId: any) {
    let url = this.forumsUrl + `${commentId}/delete-comment`;
    return this.http.delete(url);
  }

  public findAllNotApproved() {
    let url = this.forumsUrl + 'comments/not-approved-comments';
    return this.http.get(url);
  }

  public acceptComment(commentId: any) {
    let url = this.forumsUrl + `${commentId}/accept-comment`;
    return this.http.put(url, null);
  }

  public editNotApprovedComment(comment: any) {
    let url = this.forumsUrl + 'comments/edi-comment';
    return this.http.put(url, comment);
  }

  public declineComment(commentId: any) {
    let url = this.forumsUrl + `${commentId}/decline-comment`;
    return this.http.delete(url);
  }
}
