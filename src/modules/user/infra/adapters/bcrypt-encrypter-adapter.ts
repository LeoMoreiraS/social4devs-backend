import bcrypt from 'bcrypt';

import { IEncrypterAdapter } from '@user/domain/adapters/encrypter';

const salt = 10;

export class BcryptEncrypterAdapter implements IEncrypterAdapter {
  async encrypt(password: string): Promise<string> {
    const encryptedPassword = bcrypt.hash(password, salt);
    return encryptedPassword;
  }
}
