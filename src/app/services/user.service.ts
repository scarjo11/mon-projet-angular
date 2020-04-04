import {User} from "../models/User.model";
import {Subject} from "rxjs/Subject";

export class UserService {
  private users: User[] = [
    {
      firstName: 'Donkey',
      lastName: 'Kong',
      email: 'donkeykong@smash.fr',
      drinkPreference: 'Fanta',
      hobbies: [
        'Cogner',
        'Smasher',
        'Jouer'
      ],
    }
  ];
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
