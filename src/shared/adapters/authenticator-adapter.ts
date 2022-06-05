export namespace CreateTokenDTO {
  export type Params = {
    payload: string | object | Buffer;
    secret?: string;
    options?: unknown;
  };

  export type Result = {
    token: string;
  };
}

export namespace VerifyTokenDTO {
  export type Params = {
    token: string;
    secret?: string;
  };

  export type Result = {
    decodedToken: string | object | Buffer;
  };
}

export interface IAuthenticatorAdapter {
  createToken(params: CreateTokenDTO.Params): Promise<CreateTokenDTO.Result>;
  verifyToken({ token }: VerifyTokenDTO.Params): Promise<VerifyTokenDTO.Result>;
}
