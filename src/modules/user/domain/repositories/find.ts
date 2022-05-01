import { User } from '../entities/user';

export interface IFindUserByEmailRepository {
  findByEmail(email: string): Promise<User | null>;
}
