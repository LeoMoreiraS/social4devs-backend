import { User } from '../../../entities/user';

export const fakeUser = new User({
  email: 'any_mail@mail.com',
  name: 'any_name',
  bio: 'any_bio',
  nickname: 'any_nick',
  password: 'any_password',
  githubAccount: 'any_github_account',
  specialties: ['any_specialty_1', 'any_specialty_2'],
});
