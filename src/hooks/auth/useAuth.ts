import { Auth } from "aws-amplify";
import awsConfig from "../../aws-exports";
import { useEffect, useState } from "react";
Auth.configure(awsConfig);

const isUserLoggedIn = async () => {
  const user = await Auth.currentAuthenticatedUser();
  return user;
};
export const useAuth = () => {
  const [userLoggedIn, setUserLoggedIn] = useState({
    signedIn: false,
    user: null,
    loading: true,
  });
  const checkAuthStatus = async () => {
    setUserLoggedIn({
      ...userLoggedIn,
      loading: true,
    });
    const authResponse = await isUserLoggedIn();
    console.log("auth response", authResponse);
    setUserLoggedIn({
      loading: false,
      signedIn: true,
      user: authResponse,
    });
  };
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const triggerForgotPassword = async (email: string) => {
    const forgotPasswordResponse = await Auth.forgotPassword(email);
    return forgotPasswordResponse;
  };

  const forgotPasswordSubmit = async ({
    email,
    code,
    newPassword,
  }: {
    email: string;
    code: string;
    newPassword: string;
  }) => {
    const newPasswordResponse = await Auth.forgotPasswordSubmit(
      email,
      code,
      newPassword
    );
    return newPasswordResponse;
  };

  return {
    userLoggedIn,
    triggerForgotPassword,
    forgotPasswordSubmit,
  };
};
