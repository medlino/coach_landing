import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string; // Assuming 'id' will always be a string.
  }
  interface Session {
    user: User;
  }
}
