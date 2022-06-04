export interface IEncrypterAdapter {
  encrypt(password: string): Promise<string>;
}
