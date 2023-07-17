import Auth from "@/components/Auth/Auth";
import styles from "@styles/user.module.css";
import Image from "next/image";
const benefitPoints = [
  {
    key: 1,

    children: "Join the community",
  },
  {
    key: 2,

    children: "Experience and practise the Chat and Email conversation",
  },
  {
    key: 3,

    children: "Excel in your role as a customer support representative",
  },
];
const User = () => {
  return (
    <div className={styles.userContainer}>
      <div className={`${styles.leftSection}`}></div>
      <div className={`${styles.rightSection}`}>
        <Auth />
      </div>
    </div>
  );
};

User.getLayout = function getLayout(page: React.ReactNode) {
  return <>{page}</>;
};

export default User;
