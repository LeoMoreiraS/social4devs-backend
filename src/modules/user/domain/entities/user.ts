export class User {
  email: string;
  name: string;
  bio: string;
  nickname: string;
  password: string;
  // avatar
  githubAccount: string;
  specialties: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<User>) {
    if (data) Object.assign(this, data);
  }
}
