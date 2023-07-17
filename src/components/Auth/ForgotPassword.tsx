import { Button, Form, Input } from "antd";
import { useState } from "react";
import styles from "./auth.module.css";
import { useAuth } from "@/hooks/auth/useAuth";

const VerificationCode = ({
  email,
  goBackToLogin,
  changeEmail,
}: {
  email: string;
  goBackToLogin: () => void;
  changeEmail: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPasswordSubmit } = useAuth();
  const [showGoBackToLogin, setShowGoBackToLogin] = useState(false);
  const submitForgotPassword = async (values: {
    code: string;
    newPassword: string;
  }) => {
    setIsLoading(true);

    const response = await forgotPasswordSubmit({
      code: values.code,
      newPassword: values.newPassword,
      email: email,
    });
    console.log("response", response);
    setIsLoading(false);
    setShowGoBackToLogin(true);
  };

  if (showGoBackToLogin) {
    return (
      <div>
        <h3>Password updated successfully</h3>
        <Button onClick={goBackToLogin} type="link">
          Login!
        </Button>
      </div>
    );
  }
  return (
    <>
      <Form
        className={styles.formContainer}
        onFinish={submitForgotPassword}
        disabled={isLoading}
        layout="vertical"
      >
        <div className={styles.loginHeaderContainer}>
          <h2>Reset Password</h2>
          <div>
            Verification code sent to &nbsp;
            <b>{email}</b>
            <Button type="link" onClick={changeEmail}>
              Change Email
            </Button>
          </div>
        </div>
        <Form.Item
          name="code"
          label={"Verification Code"}
          rules={[
            {
              required: true,
              message: "Please enter the code",
            },
          ]}
          className={`${styles.inputContainer} ${styles.emailInputContainer}`}
        >
          <Input placeholder="hello@email.com" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={"New Password"}
          rules={[
            {
              required: true,
              message: "Please enter a password",
            },
          ]}
          className={`${styles.inputContainer} ${styles.emailInputContainer}`}
        >
          <Input.Password placeholder="1234455" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Password!
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
const ForgotPassword = ({ goBackToLogin }: { goBackToLogin: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { triggerForgotPassword } = useAuth();
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const sendVerificationCode = async (email: string) => {
    setIsLoading(true);
    const triggerForgetPasswordResponse = await triggerForgotPassword(email);
    setIsLoading(false);
    setShowVerificationCode(true);
    console.log(triggerForgetPasswordResponse);
  };

  if (showVerificationCode) {
    return (
      <VerificationCode
        email={email}
        goBackToLogin={goBackToLogin}
        changeEmail={() => {
          setEmail("");
          setShowVerificationCode(false);
        }}
      />
    );
  }
  return (
    <>
      <Form
        className={styles.formContainer}
        onFinish={(value) => {
          setEmail(value.email);
          sendVerificationCode(value.email);
        }}
        disabled={isLoading}
        layout="vertical"
      >
        <div className={styles.loginHeaderContainer}>
          <h2>Reset Password</h2>
        </div>
        <Form.Item
          name="email"
          label={"Email"}
          rules={[
            {
              required: true,
              message: "Please enter your username",
            },
          ]}
          className={`${styles.inputContainer} ${styles.emailInputContainer}`}
        >
          <Input placeholder="hello@email.com" />
        </Form.Item>
        <Form.Item
          className={`${styles.inputContainer} ${styles.proceedBtnContainer} `}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className={styles.btnContainer}
          >
            Proceed !
          </Button>
        </Form.Item>
        <Button type="link" onClick={goBackToLogin}>
          Back to Login
        </Button>
      </Form>
    </>
  );
};

export default ForgotPassword;
