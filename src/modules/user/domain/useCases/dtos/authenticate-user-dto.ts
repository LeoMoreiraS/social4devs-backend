export namespace AuthenticateUserDTO {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    token: string;
  };
}
