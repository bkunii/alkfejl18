
import { User } from './classes/user';

export const global_vars = {
  currentUser: {
    id: 1,
    userName: 'johnny',
    fullName: 'John Doe',
    ownedProjects: [100],
    projects: [101],
    skills: [12, 13],
    assignedTasks: []
  } as User
};
