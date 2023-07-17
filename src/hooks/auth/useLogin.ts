import { Auth } from "aws-amplify";

export interface ILogIn {
  username: string;
  password: string;
}

const userSignIn = async ({ username, password }: ILogIn) => {
  try {
    const { user } = await Auth.signIn({ username, password });
    console.log(user);
  } catch (error) {
    console.log("error signing in:", error);
  }
};

export const useLogin = () => {
  return {
    userSignIn,
  };
};
