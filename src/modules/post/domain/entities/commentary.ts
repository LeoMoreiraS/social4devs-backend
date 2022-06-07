export class Commentary {
  postEmail: string;
  postBody: string;
  commentary: string;
  userEmail: string;
  createdAt: Date;
  nickename: string;

  constructor(data: Partial<Commentary>) {
    if (data) Object.assign(this, data);
  }
}
