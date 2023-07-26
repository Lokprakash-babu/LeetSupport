import { useAuth } from "@/components/Auth";
import Auth from "@/components/Auth/Auth";
import Loader from "@/components/Loader";
import styles from "@styles/user.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MountPractice = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/practice");
  }, []);
  return null;
};
const User = () => {
  const { isUserLoggedIn, authenticatedUser, setAuthenticatedUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const whoAmI = async () => {
    try {
      setIsLoading(true);
      await isUserLoggedIn?.();
      setIsLoading?.(false);
    } catch (err) {
      setIsLoading?.(false);
      setAuthenticatedUser?.(null);
    }
  };

  useEffect(() => {
    whoAmI();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (authenticatedUser?.username && !isLoading) {
    return <MountPractice />;
  }
  return (
    <div className={styles.userContainer}>
      <div className={`${styles.leftSection}`}></div>

      <div className={`${styles.rightSection}`}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Leetsupport
        </h1>
        <Auth />
      </div>
    </div>
  );
};

export default User;
