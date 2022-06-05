import { Specialty } from '@specialty/domain/entities/specialty';

export namespace FindOneSpecialtyDTO {
  export type Params = {
    userEmail: string;
    name: string;
  };

  export type Result = Specialty | null;
}
