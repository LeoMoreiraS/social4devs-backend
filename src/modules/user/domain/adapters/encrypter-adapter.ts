export type ComparePasswordParamsDTO = {
  plainPassword: string;
  hashedPassword: string;
};

export interface IEncrypterAdapter {
  encrypt(password: string): Promise<string>;
  comparePassword({ plainPassword, hashedPassword }: ComparePasswordParamsDTO): Promise<boolean>;
}
