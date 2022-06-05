import bcrypt from 'bcrypt';

import { ComparePasswordParamsDTO, IEncrypterAdapter } from '@user/domain/adapters/encrypter';

const salt = 10;

export class BcryptEncrypterAdapter implements IEncrypterAdapter {
  async encrypt(password: string): Promise<string> {
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  }

  async comparePassword({
    plainPassword,
    hashedPassword,
  }: ComparePasswordParamsDTO): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword);
    return isPasswordValid;
  }
}
