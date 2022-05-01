import { User } from '../entities/user';

export interface IFindUserByGitHubRepository {
  findByGitHub(githubAccount: string): Promise<User | null>;
}
