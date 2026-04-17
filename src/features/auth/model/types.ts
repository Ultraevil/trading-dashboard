export type LoginResponse = {
  login: {
    accessToken: string;
  };
};

export type LoginCredentials = {
  email: string;
  password: string;
};
