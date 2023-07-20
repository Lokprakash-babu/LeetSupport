import { Layout } from "antd";
import { AuthContextProvider } from "./Auth";
import { useRouter } from "next/router";
import SidebarContextProvider, { Sidebar } from "./Sidebar";
import Header from "./Header";

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
            <Layout style={{ background: "white" }}>
              <Header />
              <Layout hasSider>
                <Sidebar />
                <Layout.Content>
                  <Layout style={{ background: "white" }}>{children}</Layout>
                </Layout.Content>
              </Layout>
            </Layout>
          </SidebarContextProvider>
        </AuthContextProvider>
      );
  }
};

export default AppLayout;
