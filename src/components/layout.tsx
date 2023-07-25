import { Layout } from "antd";
import { AuthContextProvider } from "./Auth";
import { useRouter } from "next/router";
import SidebarContextProvider, { Sidebar } from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import NotificationProvider from "./Notification";
import AuthLayoutWrapper from "./AuthLayoutWrapper";

const AppLayout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();

  const currentRoute = router.pathname;
  switch (currentRoute) {
    case "/user":
      return (
        <AuthContextProvider>
          <NotificationProvider>
            <>{children}</>
          </NotificationProvider>
        </AuthContextProvider>
      );
    default:
      return (
        <AuthContextProvider>
          <AuthLayoutWrapper>
            <SidebarContextProvider>
              <NotificationProvider>
                <Layout style={{ background: "white" }}>
                  <Header />
                  <Layout hasSider>
                    <Sidebar />
                    <Layout
                      style={{
                        background: "white",
                        overflow: "auto",
                        height: "calc(100vh - 56px)",
                      }}
                    >
                      {children}
                    </Layout>
                  </Layout>
                </Layout>
              </NotificationProvider>
            </SidebarContextProvider>
          </AuthLayoutWrapper>
        </AuthContextProvider>
      );
  }
};

export default AppLayout;
