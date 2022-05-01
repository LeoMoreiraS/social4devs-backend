/* eslint-disable @typescript-eslint/no-unused-vars */
import { AlreadyExistsError } from '@shared/errors/already-exists';

import { User } from '../../entities/user';
import { IFindUserByEmailRepository } from '../../repositories/find-by-email';
import { IFindUserByGitHubRepository } from '../../repositories/find-by-github';
import { CreateUserUseCase } from '../create';
import { fakeUser } from './mocks/fake-user';

function makeFindUserByGitHubRepositoryStub(): IFindUserByGitHubRepository {
  class FindUserByGitHubRepositoryStub implements IFindUserByGitHubRepository {
    async findByGitHub(githubAccount: string): Promise<User | null> {
      return null;
    }
  }

  return new FindUserByGitHubRepositoryStub();
}

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
  findUserByGitHubRepositoryStub: IFindUserByGitHubRepository;
  sut: CreateUserUseCase;
}

function makeSut(): SutTypes {
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepositoryStub();
  const findUserByGitHubRepositoryStub = makeFindUserByGitHubRepositoryStub();
  const sut = new CreateUserUseCase(
    findUserByEmailRepositoryStub,
    findUserByGitHubRepositoryStub
  );
  return { sut, findUserByEmailRepositoryStub, findUserByGitHubRepositoryStub };
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
    const findUserByEmailRepositorySpy = jest.spyOn(
      findUserByEmailRepositoryStub,
      'findByEmail'
    );
    await sut.execute(validParams);
    expect(findUserByEmailRepositorySpy).toHaveBeenCalledWith(
      'any_mail@mail.com'
    );
  });

  test('Should throw AlreadyExitsError if email already exists', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(findUserByEmailRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(fakeUser);
    const sutPromise = sut.execute(validParams);
    await expect(sutPromise).rejects.toThrow(
      new AlreadyExistsError('Email "any_mail@mail.com" already exists')
    );
  });

  test('Should call FindUserByGitHubRepository with correct values', async () => {
    const { sut, findUserByGitHubRepositoryStub } = makeSut();
    const findUserByGitHubRepositorySpy = jest.spyOn(
      findUserByGitHubRepositoryStub,
      'findByGitHub'
    );
    await sut.execute(validParams);
    expect(findUserByGitHubRepositorySpy).toHaveBeenCalledWith(
      'any_github_account'
    );
  });
});
