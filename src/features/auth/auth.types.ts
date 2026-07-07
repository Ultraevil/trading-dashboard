export type LoginResponse = {
  login: {
    accessToken: string;
    refreshToken: string;
  };
};

export type LoginCredentials = {
  email: string;
  password: string;
};
