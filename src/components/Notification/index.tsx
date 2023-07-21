import { notification } from "antd";
import React, { createContext, useContext } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

export interface INotificationContext {
  warningNotification?: (message: {
    title: string;
    description: string;
  }) => void;
}
export const NotificationContext = createContext<INotificationContext>({});
const NotificationProvider = ({ children }: { children: any }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: {
      title: string;
      description: string;
    }
  ) => {
    api[type]({
      message: message.title,
      description: message.description,
    });
  };
  const warningNotification = (message: {
    title: string;
    description: string;
  }) => {
    openNotificationWithIcon("warning", message);
  };
  return (
    <NotificationContext.Provider
      value={{
        warningNotification,
      }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const params = useContext(NotificationContext);
  return {
    ...params,
  };
};
export default NotificationProvider;
