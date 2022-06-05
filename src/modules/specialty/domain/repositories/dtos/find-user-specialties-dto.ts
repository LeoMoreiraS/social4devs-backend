import { Specialty } from '@specialty/domain/entities/specialty';

export namespace FindUserSpecialtiesDTO {
  export type Params = {
    email: string;
  };

  export type Result = Specialty[] | null;
}
