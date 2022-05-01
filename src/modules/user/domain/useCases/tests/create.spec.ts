/* eslint-disable @typescript-eslint/no-unused-vars */
import { AlreadyExistsError } from '@shared/errors/already-exists';

import { User } from '../../entities/user';
import { IFindUserByEmailRepository } from '../../repositories/find-by-email';
import { CreateUserUseCase } from '../create';
import { fakeUser } from './mocks/fake-user';

function makeFindUserByEmailRepositoryStub(): IFindUserByEmailRepository {
  class FindUserByEmailRepositoryStub implements IFindUserByEmailRepository {
    async findByEmail(email: string): Promise<User | null> {
      return null;
    }
  }

  return new FindUserByEmailRepositoryStub();
}

interface SutTypes {
  findUserByEmailRepositoryStub: IFindUserByEmailRepository;
  sut: CreateUserUseCase;
}

function makeSut(): SutTypes {
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepositoryStub();
  const sut = new CreateUserUseCase(findUserByEmailRepositoryStub);
  return { sut, findUserByEmailRepositoryStub };
}

const validParams = {
  email: 'any_mail@mail.com',
  name: 'any_name',
  bio: 'any_bio',
  nickname: '',
  password: '',
  githubAccount: 'any_github_account',
  specialties: ['', ''],
};

describe('Create user', () => {
  test('Should call FindUserByEmailRepository with correct values', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    const findUserByEmailRepositorySpy = jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail');
    await sut.execute(validParams);
    expect(findUserByEmailRepositorySpy).toHaveBeenCalledWith('any_mail@mail.com');
  });

  test('Should throw AlreadyExitsError if email already exists', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail').mockResolvedValueOnce(fakeUser);
    const sutPromise = sut.execute(validParams);
    await expect(sutPromise).rejects.toThrow(new AlreadyExistsError('Email \'any_mail@mail.com\' already exists'));
  });
});
