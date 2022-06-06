export class Like {
  postEmail: string;
  postCreatedAt: string;
  userEmail: string;
  createdAt: Date;

  constructor(data: Partial<Like>) {
    if (data) Object.assign(this, data);
  }
}
