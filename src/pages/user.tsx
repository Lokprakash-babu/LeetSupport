import { useAuth } from "@/components/Auth";
import Auth from "@/components/Auth/Auth";
import styles from "@styles/user.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const User = () => {
  const { isUserLoggedIn, authenticatedUser, setAuthenticatedUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
    return <p>Loading...</p>;
  }
  if (authenticatedUser?.username && !isLoading) {
    router.replace("/practice");
    return null;
  }
  return (
    <div className={styles.userContainer}>
      <div className={`${styles.leftSection}`}></div>
      <div className={`${styles.rightSection}`}>
        <Auth />
      </div>
    </div>
  );
};

export default User;
