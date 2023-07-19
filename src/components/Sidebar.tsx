import {
  AimOutlined,
  CoffeeOutlined,
  ExperimentOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { useState, createContext, useContext, CSSProperties } from "react";

export interface ISidebarContext {
  collapseSidebar?: () => void;
  expandSidebar?: () => void;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}
export const SidebarContext = createContext<ISidebarContext>({});

const SidebarContextProvider = ({ children }: { children: any }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const collapseSidebar = () => setSidebarOpen(false);
  const expandSidebar = () => setSidebarOpen(true);
  return (
    <SidebarContext.Provider
      value={{
        collapseSidebar,
        expandSidebar,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const params = useContext(SidebarContext);
  return {
    ...params,
  };
};

const SidebarItemLink = ({ link, label }: { link: string; label: string }) => {
  return (
    <>
      <Link href={link}>{label}</Link>
    </>
  );
};

const sideBarStylings: CSSProperties = {
  overflow: "auto",
  height: "100vh",
  paddingTop: "24px",
};

const SidebarMenuItems = [
  {
    label: <SidebarItemLink link="/practice" label="Practice" />,
    icon: <AimOutlined />,
    key: "Practice",
  },
  {
    label: <SidebarItemLink link="/submissions" label="Submissions" />,
    icon: <AimOutlined />,
    key: "Submissions",
  },
  {
    label: "Learn (Coming Soon!)",
    key: "tutorials",
    icon: <ExperimentOutlined />,
    disabled: true,
  },
  {
    label: "Jobs (Coming soon!)",
    key: "jobs",
    icon: <FireOutlined />,
    disabled: true,
  },
  {
    label: "Interview (Coming soon!)",
    key: "interview",
    disabled: true,
    icon: <CoffeeOutlined />,
  },
];

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarContext();
  return (
    <Layout.Sider
      style={sideBarStylings}
      width={220}
      collapsible
      collapsed={!sidebarOpen}
      onCollapse={(value) => {
        console.log("value", value);
        setSidebarOpen?.(!value);
      }}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["Practice"]}
        items={SidebarMenuItems}
      />
    </Layout.Sider>
  );
};
export default SidebarContextProvider;
