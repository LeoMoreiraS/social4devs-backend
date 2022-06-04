import { Specialty } from './specialty';

export interface User {
  email: string;
  name: string;
  bio: string;
  nickname: string;
  password: string;
  // avatar
  githubAccount: string;
  specialties: Specialty[];
}
