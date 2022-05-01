/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateUserUseCase } from '../create';

interface SutTypes {
  sut: CreateUserUseCase;
}

function makeSut(): SutTypes {
  const sut = new CreateUserUseCase();
  return { sut };
}

const validParams = {
  email: 'any_mail@mail.com',
  name: 'any_name',
  bio: 'any_bio',
  nickname: '',
  password: '',
  github_account: '',
  specialties: ['', ''],
};

describe('Create user', () => {
  test('Should', async () => {
    const { sut } = makeSut();
    await sut.execute(validParams);
  });
});
