import React, { useState } from "react";
import styles from "./auth.module.css";
import Login from "./Login";
import Signup from "./Signup";

export interface IAuthFooter {
  onRegisterClick: () => any;
  onLoginClick: () => any;
}

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className={styles.authContainer}>
      {showLogin && <Login onSignupClick={() => setShowLogin(false)} />}
      {!showLogin && <Signup onLoginClick={() => setShowLogin(true)} />}
    </div>
  );
};

export default Auth;
