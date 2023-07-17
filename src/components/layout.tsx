import React, { CSSProperties, useMemo } from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./Auth";
import { useRouter } from "next/router";
const SidebarItemLink = ({ link, label }: { link: string; label: string }) => {
  return <Link href={link}>{label}</Link>;
};
const SidebarMenuItems = [
  {
    label: <SidebarItemLink link="/practice" label="Practice" />,
    key: "Practice",
  },
  {
    label: "Learn (Coming Soon!)",
    key: "tutorials",
    disabled: true,
  },
  {
    label: "Jobs (Coming soon!)",
    key: "jobs",
    disabled: true,
  },
  {
    label: "Interview (Coming soon!)",
    key: "interview",
    disabled: true,
  },
];
const AppLayout = ({ children }: { children: JSX.Element }) => {
  const sideBarStylings: CSSProperties = useMemo(() => {
    return {
      overflow: "auto",
      height: "100vh",
      paddingTop: "24px",
    };
  }, []);

  const router = useRouter();

  const currentRoute = router.pathname;
  switch (currentRoute) {
    case "/user":
      return (
        <AuthContextProvider>
          <>{children}</>
        </AuthContextProvider>
      );
    default:
      return (
        <AuthContextProvider>
          <Layout style={{ background: "white" }} hasSider>
            <Toaster position="top-right" />

            <Layout.Sider style={sideBarStylings} width={220}>
              <Menu
                theme="dark"
                defaultSelectedKeys={["Practice"]}
                items={SidebarMenuItems}
              />
            </Layout.Sider>
            <Layout.Content>
              <Layout style={{ background: "white" }}>{children}</Layout>
            </Layout.Content>
          </Layout>
        </AuthContextProvider>
      );
  }
};

export default AppLayout;
