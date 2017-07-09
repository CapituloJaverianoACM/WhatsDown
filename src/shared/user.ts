export interface User {
  name: string;
  username: string;
  image: string;
  statusMessage: string;
  mobileNumber: string;
  contacts: User[];
}
