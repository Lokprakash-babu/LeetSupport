import React, { useContext, useEffect } from "react";
import { Auth } from "aws-amplify";
import awsConfig from "../../aws-exports";
Auth.configure({ ...awsConfig, ssr: true });
export interface IAuthArgs {
  email: string;
  password: string;
}
type ConfirmSignUpParameters = {
  username: string;
  code: string;
};
export interface IForgotPasswordCode {
  email: string;
  code: string;
  newPassword: string;
}

export interface IAuthContext {
  authenticatedUser?: any;
  authLoading?: boolean;
  confirmSignUp?: (values: ConfirmSignUpParameters) => void;
  forgotPasswordEmailSubmit?: (email: string) => void;
  forgotPasswordCodeSubmit?: (args: IForgotPasswordCode) => void;
  isUserLoggedIn?: () => any;
  resendConfirmationCode?: (username: string) => void;
  signIn?: (values: IAuthArgs) => void;
  signOut?: () => void;
  signUp?: (values: IAuthArgs) => void;
  setAuthLoading?: (loading: boolean) => void;
  setAuthenticatedUser?: (user: any) => void;
}

export const AuthContext = React.createContext<IAuthContext>({});

export const AuthContextProvider = ({ children }: any) => {
  const [authenticatedUser, setAuthenticatedUser] = React.useState<any>(null);
  const [authLoading, setAuthLoading] = React.useState<boolean>(true);

  const confirmSignUp = async ({ username, code }: ConfirmSignUpParameters) => {
    setAuthLoading(true);

    const response = await Auth.confirmSignUp(username, code, {
      forceAliasCreation: false,
    });
    setAuthenticatedUser(response);
    setAuthLoading(false);
  };

  const forgotPasswordEmailSubmit = async (email: string) => {
    setAuthLoading(true);

    const forgotPasswordResponse = await Auth.forgotPassword(email);
    setAuthLoading(false);

    return forgotPasswordResponse;
  };

  const forgotPasswordCodeSubmit = async ({
    email,
    code,
    newPassword,
  }: IForgotPasswordCode) => {
    setAuthLoading(true);

    const newPasswordResponse = await Auth.forgotPasswordSubmit(
      email,
      code,
      newPassword
    );
    setAuthLoading(false);
    return newPasswordResponse;
  };

  const isUserLoggedIn = async () => {
    try {
      setAuthLoading(true);
      const response = await Auth.currentAuthenticatedUser();
      setAuthenticatedUser(response);
      setAuthLoading(false);
    } catch (error) {
      setAuthLoading(false);
      throw error;
    }
  };

  const resendConfirmationCode = async (username: string) => {
    setAuthLoading(true);

    await Auth.resendSignUp(username);
    setAuthLoading(false);
  };

  const signIn = async ({ email, password }: IAuthArgs) => {
    setAuthLoading(true);
    const response = await Auth.signIn({ username: email, password });
    setAuthenticatedUser(response);
    setAuthLoading(false);
  };

  const signUp = async ({ email, password }: IAuthArgs) => {
    setAuthLoading(true);
    await Auth.signUp({
      username: email,
      password,
    });
    setAuthLoading(false);
  };

  const signOut = async () => {
    setAuthLoading(true);

    await Auth.signOut();
    setAuthLoading(false);
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        authLoading,
        setAuthLoading,
        setAuthenticatedUser,
        confirmSignUp,
        isUserLoggedIn,
        resendConfirmationCode,
        forgotPasswordEmailSubmit,
        forgotPasswordCodeSubmit,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const parameters = useContext(AuthContext);
  return {
    ...parameters,
  };
};
