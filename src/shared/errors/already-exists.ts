export class AlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
  }
}
