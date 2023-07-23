import { Form, Input, Button } from "antd";
import styles from "./auth.module.css";
import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import { useAuth } from ".";
import { useNotificationContext } from "../Notification";
import ConfirmAccount from "./ConfirmAccount";

export interface ILogin {
  onSignupClick: () => void;
  onLoginSuccess: () => void;
}
const Login = ({ onSignupClick, onLoginSuccess }: ILogin) => {
  const { signIn, setAuthLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const { errorNotification } = useNotificationContext();
  const [showConfirmAccount, setShowConfirmAccount] = useState(false);
  const loginUser = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      await signIn?.({ ...values });
      onLoginSuccess();
      setIsLoading(false);
      setAuthLoading?.(false);
    } catch (error: any) {
      setIsLoading(false);
      setAuthLoading?.(false);
      errorNotification?.({
        title: error.message,
        description: "",
      });
    }
  };
  if (showConfirmAccount) {
    return (
      <ConfirmAccount
        onSuccessfullConfirm={() => {
          setForgotPassword(false);
          setShowConfirmAccount(false);
        }}
        onSignUp={() => {
          onSignupClick();
        }}
        onLogin={() => {
          window?.location?.reload();
        }}
      />
    );
  }
  if (forgotPassword) {
    return (
      <ForgotPassword
        goBackToLogin={() => {
          setForgotPassword(false);
        }}
      />
    );
  }
  return (
    <>
      <Form
        className={styles.formContainer}
        onFinish={loginUser}
        disabled={isLoading}
        layout="vertical"
      >
        <div className={styles.loginHeaderContainer}>
          <div>
            <h2>Login</h2>
            <p>Welcome back!</p>
          </div>
        </div>
        <Form.Item
          name="email"
          label={"Email"}
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
          ]}
          className={`${styles.inputContainer} ${styles.emailInputContainer}`}
        >
          <Input placeholder="hello@email.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label={"Password"}
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
          className={styles.inputContainer}
        >
          <Input.Password placeholder="********" />
        </Form.Item>
        <div className={styles.forgotPasswordContainer}>
          <Button
            type="link"
            className={styles.forgotPassword}
            onClick={() => {
              setForgotPassword(true);
            }}
          >
            Forgot password
          </Button>
        </div>
        <Form.Item
          className={`${styles.inputContainer} ${styles.proceedBtnContainer} `}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className={styles.btnContainer}
          >
            Login!
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.signupContainer}>
        <div>
          Don&apos;t have an account Yet?{" "}
          <Button
            type="link"
            onClick={() => {
              onSignupClick();
            }}
            className={styles.backIngressBtn}
          >
            Sign Up!
          </Button>
        </div>
      </div>
      <div className={styles.signupContainer}>
        <div>
          Forgot to verify your account?{" "}
          <Button
            type="link"
            onClick={() => {
              setShowConfirmAccount(true);
              setForgotPassword(false);
            }}
            className={styles.backIngressBtn}
          >
            Verify Now!
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
