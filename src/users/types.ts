export type UsersQueryParams<T extends boolean> = {
  withPassword?: T;
};

export type UserRow = {
  id: string;
  email: string;
};

export type UserRowWithPassword = UserRow & {
  password: string;
};

export type UserQueryResult<T extends boolean> = T extends true
  ? UserRowWithPassword
  : UserRow;
