import { Like } from './like';

export class Post {
  email: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];

  constructor(data: Partial<Post>) {
    if (data) Object.assign(this, data);
  }
}
