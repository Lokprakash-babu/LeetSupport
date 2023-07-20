import { UserOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useAuth } from "./Auth";
import { useRouter } from "next/router";

const Header = () => {
  const { signOut, authLoading } = useAuth();
  const router = useRouter();
  return (
    <header className="header">
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
      <h2>Leetsupport</h2>
    </header>
  );
};

export default Header;
