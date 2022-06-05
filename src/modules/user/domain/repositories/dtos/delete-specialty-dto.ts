import { Specialty } from '@user/domain/entities/specialty';

export namespace DeleteSpecialtyDTO {
  export type Params = {
    userEmail: string;
    name: string;
  };

  export type Result = Specialty | null;
}
