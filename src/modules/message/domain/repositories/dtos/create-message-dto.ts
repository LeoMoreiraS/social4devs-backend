import { Message } from '../../entities/message';

export namespace CreateMessageDTO {
  export type Params = {
    emailUserSender: string;
    emailUserReceiver: string;
    text: string;
  };

  export type Result = Message;
}
