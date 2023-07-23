import { Button, Form, Input } from "antd";
import styles from "./auth.module.css";
import { useNotificationContext } from "../Notification";
import { useAuth } from ".";
import { useEffect, useState } from "react";

export interface IConfirmAccount {
  defaultEmail?: string;
  onSuccessfullConfirm?: () => void;
  onSignUp?: () => void;
  onLogin?: () => void;
}
const ConfirmAccount = ({
  defaultEmail = "",
  onSuccessfullConfirm = () => null,
  onSignUp = () => null,
  onLogin = () => null,
}: IConfirmAccount) => {
  const { confirmSignUp, resendConfirmationCode, authLoading, setAuthLoading } =
    useAuth();
  const { errorNotification } = useNotificationContext();
  const [email, setEmail] = useState(defaultEmail);

  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const confirmUser = async (value: any) => {
    try {
      await confirmSignUp?.({
        username: email,
        code: value.verificationCode,
      });
      onSuccessfullConfirm();
    } catch (err: any) {
      errorNotification?.({
        title: err.message,
        description: "",
      });
      setAuthLoading?.(false);
    }
  };

  const resendVerificationCode = async (paramEmail?: string) => {
    try {
      await resendConfirmationCode?.(paramEmail || email);
      setShowVerificationCode(true);
    } catch (err: any) {
      errorNotification?.({
        title: err.message,
        description: "",
      });
      setAuthLoading?.(false);
    }
  };

  const FormSetEmail = async (values: { email: string }) => {
    setEmail(values.email);
    await resendVerificationCode(values.email);
  };

  useEffect(() => {
    if (defaultEmail) {
      setShowVerificationCode(true);
    }
  }, [defaultEmail]);
  return (
    <div>
      {showVerificationCode && (
        <div className={styles.verificationEmailContainer}>
          Please enter the verification code sent to
          <br />
          <b>{email}</b>
          <Button
            type="link"
            onClick={() => {
              setShowVerificationCode(false);
              setEmail(defaultEmail);
            }}
          >
            Change!
          </Button>
        </div>
      )}
      {!showVerificationCode && (
        <>
          <div
            style={{
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            <h2>Verify your account</h2>
          </div>
          <Form
            className={styles.formContainer}
            onFinish={FormSetEmail}
            layout="vertical"
            disabled={authLoading}
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.nextBtn}
                loading={authLoading}
              >
                Proceed!
              </Button>
            </Form.Item>
          </Form>
          <div className={styles.signupContainer}>
            <div>
              Don&apos;t have an account?{" "}
              <Button
                type="link"
                onClick={onSignUp}
                className={styles.backIngressBtn}
              >
                Sign Up!
              </Button>
            </div>
          </div>
          <div className={styles.signupContainer}>
            <div>
              Already have an account?{" "}
              <Button
                type="link"
                onClick={onLogin}
                className={styles.backIngressBtn}
              >
                Login!
              </Button>
            </div>
          </div>
        </>
      )}
      {showVerificationCode && (
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
              onClick={() => resendVerificationCode()}
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
      )}
    </div>
  );
};

export default ConfirmAccount;
