import { Auth } from "aws-amplify";

const userSignout = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
};

export const useLogin = () => {
  return {
    userSignout,
  };
};
