import { Commentary } from './commentary';
import { Like } from './like';

export class Post {
  email: string;
  content: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
  totalLikes: number;
  liked: number;
  likes: Like[];
  commentaries: Commentary[];

  constructor(data: Partial<Post>) {
    if (data) Object.assign(this, data);
  }
}
