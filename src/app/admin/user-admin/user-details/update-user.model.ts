import { User } from 'app/core/user/user.model';

export class UpdateUser extends User {
  isAdministrator: boolean;
  accountBalance: number;
}
