
import { User } from './classes/user';

export declare var currentUser:  User;

export function dateToString(date: Date): string {
  if (date !== null) {
    return date.toLocaleDateString('hu-HU', {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'});
  } else {
    return '';
  }
}
