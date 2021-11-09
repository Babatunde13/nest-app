export type SignInUser = {
  email: string;
  password: string;
};

export type SignUpUser = { fullname: string } & SignInUser;

export type User = { _id: string, passwordHash: string } & Omit<SignUpUser, 'password'>;
