import { Layout } from "antd";
import { AuthContextProvider } from "./Auth";
import { useRouter } from "next/router";
import SidebarContextProvider, { Sidebar } from "./Sidebar";

const AppLayout = ({ children }: { children: JSX.Element }) => {
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
          <SidebarContextProvider>
            <Layout style={{ background: "white" }} hasSider>
              <Sidebar />
              <Layout.Content>
                <Layout style={{ background: "white" }}>{children}</Layout>
              </Layout.Content>
            </Layout>
          </SidebarContextProvider>
        </AuthContextProvider>
      );
  }
};

export default AppLayout;
