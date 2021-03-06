export class Like {
  postEmail: string;
  postBody: string;
  userEmail: string;
  createdAt: Date;
  nickname: string;

  constructor(data: Partial<Like>) {
    if (data) Object.assign(this, data);
  }
}
