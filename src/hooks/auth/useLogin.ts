import { Auth } from "aws-amplify";

export interface ILogIn {
  email: string;
  password: string;
}

const userSignIn = async ({ email, password }: ILogIn) => {
  const { user } = await Auth.signIn({ username: email, password });
  return user;
};

export const useLogin = () => {
  return {
    userSignIn,
  };
};
