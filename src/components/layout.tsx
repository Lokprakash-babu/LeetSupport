import { Layout } from "antd";
import { AuthContextProvider } from "./Auth";
import { useRouter } from "next/router";
import SidebarContextProvider, { Sidebar } from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import NotificationProvider from "./Notification";

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
          <SidebarContextProvider>
            <NotificationProvider>
              <Layout style={{ background: "white" }}>
                <Header />
                <Layout hasSider>
                  <Sidebar />
                  {/* <Layout.Content> */}
                  <Layout
                    style={{
                      background: "white",
                      overflow: "auto",
                      height: "calc(100vh - 56px)",
                    }}
                  >
                    {children}
                  </Layout>
                  {/* </Layout.Content> */}
                </Layout>
              </Layout>
            </NotificationProvider>
          </SidebarContextProvider>
        </AuthContextProvider>
      );
  }
};

export default AppLayout;
