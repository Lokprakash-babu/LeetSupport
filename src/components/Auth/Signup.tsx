import { Form, Input, Button } from "antd";
import styles from "./auth.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useAuth } from ".";
import PasswordValidator from "../PasswordValidator";
import { useNotificationContext } from "../Notification";
const Signup = ({ onLoginClick }: { onLoginClick: () => any }) => {
  const {
    signUp,
    confirmSignUp,
    signIn,
    resendConfirmationCode,
    authLoading,
    setAuthLoading,
  } = useAuth();
  const [showVerificationCode, setShowVerificationCode] = useState({
    email: "",
  });

  const [form] = Form.useForm();
  const passwordEntered = Form.useWatch("password", form);
  const { errorNotification } = useNotificationContext();
  const [password, setPassword] = useState("");
  const SignupUser = async (value: any) => {
    try {
      setPassword(value.password);
      await signUp?.({ ...value });
      setShowVerificationCode({
        email: value.email,
      });
    } catch (err: any) {
      errorNotification?.({
        title: err.message,
        description: "",
      });
      setAuthLoading?.(false);
    }
  };
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~`]/;
  const isPasswordValid =
    uppercaseRegex.test(passwordEntered) &&
    numberRegex.test(passwordEntered) &&
    specialCharRegex.test(passwordEntered);
  const router = useRouter();
  const confirmUser = async (value: any) => {
    try {
      await confirmSignUp?.({
        username: showVerificationCode.email,
        code: value.verificationCode,
      });
      await signInUser();
      router.replace("/practice");
    } catch (err: any) {
      errorNotification?.({
        title: err.message,
        description: "",
      });
      setAuthLoading?.(false);
    }
  };

  const resendVerificationCode = async () => {
    try {
      await resendConfirmationCode?.(showVerificationCode.email);
    } catch (err: any) {
      errorNotification?.({
        title: err.message,
        description: "",
      });
      setAuthLoading?.(false);
    }
  };

  const signInUser = async () => {
    try {
      await signIn?.({ password, email: showVerificationCode.email });
    } catch (err: any) {
      errorNotification?.({
        title: err.message,
        description: "",
      });
      setAuthLoading?.(false);
    }
  };
  return (
    <>
      <div className={styles.joinUsContainer}>
        <h2>Join Us!</h2>
        <p>
          Already have an account?{" "}
          <Button
            type="link"
            onClick={onLoginClick}
            className={styles.backIngressBtn}
          >
            Login
          </Button>
        </p>
      </div>
      {showVerificationCode.email && (
        <motion.div>
          <div className={styles.verificationEmailContainer}>
            Please enter the verification code sent to
            <br />
            <b>{showVerificationCode.email}</b>
          </div>
          <Form
            className={styles.formContainer}
            onFinish={confirmUser}
            layout="vertical"
            disabled={authLoading}
          >
            <Form.Item
              name="verificationCode"
              label={"Verification Code"}
              rules={[
                {
                  required: true,
                  message: "Verification Code is required",
                },
              ]}
              className={styles.inputContainer}
            >
              <Input placeholder="12345" />
            </Form.Item>
            <div>
              Didn&apos;t receive code{" "}
              <Button
                type="link"
                onClick={resendVerificationCode}
                loading={authLoading}
              >
                Resend Code
              </Button>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.nextBtn}
                loading={authLoading}
              >
                Verify!
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      )}
      {!showVerificationCode.email && (
        <motion.div
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <Form
            className={styles.formContainer}
            onFinish={SignupUser}
            layout="vertical"
            disabled={authLoading}
            form={form}
          >
            <Form.Item
              name="email"
              label={"Email"}
              rules={[
                {
                  required: true,
                  message: "Please enter an Email",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
              className={`${styles.inputContainer} ${styles.emailInputContainer}`}
            >
              <Input placeholder="hello@email.com" />
            </Form.Item>
            <Form.Item
              name="password"
              label={"New Password"}
              rules={[
                {
                  required: true,
                  message: "Please enter a password",
                },
              ]}
              className={`${styles.inputContainer} ${styles.marginAddition}`}
            >
              <Input.Password placeholder="*******" />
            </Form.Item>
            {passwordEntered && (
              <PasswordValidator password={passwordEntered || ""} />
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.btnContainer}
                loading={authLoading}
                disabled={!isPasswordValid}
              >
                Sign up!
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      )}
    </>
  );
};

export default Signup;
