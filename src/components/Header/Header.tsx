import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useAuth } from "../Auth";
import { useRouter } from "next/router";
import styles from "./Header.module.css";
import Link from "next/link";

const mobilePopoverNavItems = [
  {
    link: "/practice",
    title: "Practice",
  },
  {
    link: "/submissions",
    title: "Submissions",
  },
];

const MobilePopoverNav = () => {
  const router = useRouter();
  const { signOut, authLoading } = useAuth();

  return (
    <>
      {mobilePopoverNavItems.map((item) => (
        <div key={item.link} className={styles.mobileNavItem}>
          <Link href={item.link}>{item.title}</Link>
        </div>
      ))}
      <Button
        type="link"
        onClick={async (e) => {
          e.stopPropagation();
          await signOut?.();
          router.replace("/user");
        }}
        loading={authLoading}
      >
        Sign Out
      </Button>
    </>
  );
};
const HeaderPopover = () => {
  return (
    <Popover content={<MobilePopoverNav />}>
      <MenuOutlined />
    </Popover>
  );
};
const Header = () => {
  const { signOut, authLoading } = useAuth();
  const router = useRouter();
  return (
    <header className="header">
      <div className={styles.desktopMenu}>
        <Popover
          trigger={"click"}
          content={
            <Button
              type="link"
              onClick={async (e) => {
                e.stopPropagation();
                await signOut?.();
                router.replace("/user");
              }}
              loading={authLoading}
            >
              Sign Out
            </Button>
          }
        >
          <div>
            <UserOutlined />
          </div>
        </Popover>
      </div>
      <div className={styles.mobileMenu}>
        <HeaderPopover />
      </div>
      <h4>Leetsupport</h4>
    </header>
  );
};

export default Header;
