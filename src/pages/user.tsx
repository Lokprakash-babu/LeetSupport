import Auth from "@/components/Auth/Auth";
import { requireAuth } from "@/utils/requireAuth";
import styles from "@styles/user.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

const User = ({ user }: { user: any }) => {
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace("/practice");
    }
  }, []);
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
export const getServerSideProps = requireAuth;
