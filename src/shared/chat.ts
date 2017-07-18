import { Message } from './message';

export interface Chat {
  host: string;
  recipient: string;
  _id: string;
  messages: Message[];
}
