import { Form, Input, Button } from "antd";
import styles from "./auth.module.css";
import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import { useAuth } from ".";
import { useNotificationContext } from "../Notification";

export interface ILogin {
  onSignupClick: () => void;
  onLoginSuccess: () => void;
}
const Login = ({ onSignupClick, onLoginSuccess }: ILogin) => {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const { errorNotification } = useNotificationContext();
  const loginUser = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      await signIn?.({ ...values });
      setError("");
      onLoginSuccess();
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
      errorNotification?.({
        title: error.message,
        description: "",
      });
    }
    setIsLoading(false);
  };
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
          {error && <div className={styles.error}>{error}</div>}
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
              setError("");
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
              setError("");
            }}
            className={styles.backIngressBtn}
          >
            Sign Up!
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
