/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../../entities/user';
import { IFindUserByEmailRepository } from '../../repositories/find';
import { CreateUserUseCase } from '../create';

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
  github_account: '',
  specialties: ['', ''],
};

describe('Create user', () => {
  test('Should call FindUserByEmailRepository with correct email', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    const findUserByEmailRepositorySpy = jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail');
    await sut.execute(validParams);
    expect(findUserByEmailRepositorySpy).toHaveBeenCalledWith('any_mail@mail.com');
  });
});
