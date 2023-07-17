import React, { useState } from "react";
import styles from "./auth.module.css";
import Login from "./Login";
import Signup from "./Signup";
import { useRouter } from "next/router";

export interface IAuthFooter {
  onRegisterClick: () => any;
  onLoginClick: () => any;
}

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const router = useRouter();
  return (
    <div className={styles.authContainer}>
      {showLogin && (
        <Login
          onSignupClick={() => setShowLogin(false)}
          onLoginSuccess={() => {
            router.replace("/practice");
          }}
        />
      )}
      {!showLogin && <Signup onLoginClick={() => setShowLogin(true)} />}
    </div>
  );
};

export default Auth;
