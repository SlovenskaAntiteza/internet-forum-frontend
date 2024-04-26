import { CommentUser } from './comment-user';

export interface Comment {
  id?: number;
  date?: string;
  comment?: string;
  approved?: boolean;
  forumId?: number;
  user?: CommentUser;
}
