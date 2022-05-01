/* eslint-disable @typescript-eslint/no-unused-vars */
import { AlreadyExistsError } from '@shared/errors/already-exists';

import { IEncrypterAdapter } from '@user/domain/adapters/encrypter';
import { IFindUserByEmailRepository } from '@user/domain/repositories/find-by-email';
import { IFindUserByGitHubRepository } from '@user/domain/repositories/find-by-github';

import { User } from '../../entities/user';
import { CreateUserUseCase } from '../create';
import { fakeUser } from './mocks/fake-user';

function makeEncrypterAdapter(): IEncrypterAdapter {
  class EncrypterAdapterStub implements IEncrypterAdapter {
    async encrypt(password: string): Promise<string> {
      return 'encrypted_password';
    }
  }

  return new EncrypterAdapterStub();
}

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
  encypterAdapter: IEncrypterAdapter;
  sut: CreateUserUseCase;
}

function makeSut(): SutTypes {
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepositoryStub();
  const findUserByGitHubRepositoryStub = makeFindUserByGitHubRepositoryStub();
  const encypterAdapter = makeEncrypterAdapter();
  const sut = new CreateUserUseCase(
    findUserByEmailRepositoryStub,
    findUserByGitHubRepositoryStub,
    encypterAdapter
  );
  return { sut, findUserByEmailRepositoryStub, findUserByGitHubRepositoryStub, encypterAdapter };
}

const validParams = {
  email: 'any_mail@mail.com',
  name: 'any_name',
  bio: 'any_bio',
  nickname: '',
  password: 'any_password',
  githubAccount: 'any_github_account',
  specialties: ['', ''],
};

describe('Create user', () => {
  test('Should call FindUserByEmailRepository with correct email', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    const findUserByEmailRepositorySpy = jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail');
    await sut.execute(validParams);
    expect(findUserByEmailRepositorySpy).toHaveBeenCalledWith('any_mail@mail.com');
  });

  test('Should throw AlreadyExitsError if email already exists', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail').mockResolvedValueOnce(fakeUser);
    const sutPromise = sut.execute(validParams);
    await expect(sutPromise).rejects.toThrow(
      new AlreadyExistsError('Email "any_mail@mail.com" already exists')
    );
  });

  test('Should call FindUserByGitHubRepository with correct github account', async () => {
    const { sut, findUserByGitHubRepositoryStub } = makeSut();
    const findUserByGitHubRepositorySpy = jest.spyOn(
      findUserByGitHubRepositoryStub,
      'findByGitHub'
    );
    await sut.execute(validParams);
    expect(findUserByGitHubRepositorySpy).toHaveBeenCalledWith('any_github_account');
  });

  test('Should throw AlreadyExitsError if github account already exists', async () => {
    const { sut, findUserByGitHubRepositoryStub } = makeSut();
    jest.spyOn(findUserByGitHubRepositoryStub, 'findByGitHub').mockResolvedValueOnce(fakeUser);
    const sutPromise = sut.execute(validParams);
    await expect(sutPromise).rejects.toThrow(
      new AlreadyExistsError('GitHub account "any_github_account" already exists')
    );
  });

  test('Should call EncrypterAdapter with correct password', async () => {
    const { sut, encypterAdapter } = makeSut();
    const encypterAdapterSpy = jest.spyOn(encypterAdapter, 'encrypt');
    await sut.execute(validParams);
    expect(encypterAdapterSpy).toHaveBeenCalledWith('any_password');
  });
});
