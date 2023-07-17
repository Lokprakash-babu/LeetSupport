import { Auth } from "aws-amplify";
import awsConfig from "../../aws-exports";
Auth.configure(awsConfig);

export interface ISignup {
  email: string;
  password: string;
}
type ConfirmSignUpParameters = {
  username: string;
  code: string;
};

const userSignUp = async ({ email, password }: ISignup) => {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
    });
    console.log(user);
  } catch (error) {
    console.log("error signing up:", error);
  }
};

async function resendConfirmationCode(username: string) {
  try {
    await Auth.resendSignUp(username);
    console.log("code resent successfully");
  } catch (err) {
    console.log("error resending code: ", err);
  }
}
export async function confirmSignUp({
  username,
  code,
}: ConfirmSignUpParameters) {
  try {
    await Auth.confirmSignUp(username, code, {
      forceAliasCreation: false,
    });
  } catch (error) {
    console.log("error confirming sign up", error);
  }
}
export const useSignup = () => {
  return {
    userSignUp,
    confirmSignUp,
    resendConfirmationCode,
  };
};
