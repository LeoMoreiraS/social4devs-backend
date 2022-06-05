import { Message } from '@message/domain/entities/message';

export namespace GetUserChatDTO {
  export type Params = {
    emailUserSender: string;
    emailUserReceiver: string;
  };

  export type Result = Message[];
}
