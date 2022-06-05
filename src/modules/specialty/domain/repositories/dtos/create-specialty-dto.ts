import { Specialty } from '@specialty/domain/entities/specialty';

export namespace CreateSpecialtyDTO {
  export type Params = {
    userEmail: string;
    name: string;
  };

  export type Result = Specialty;
}
