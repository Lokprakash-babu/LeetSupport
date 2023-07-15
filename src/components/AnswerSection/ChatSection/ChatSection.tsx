import { useCallback, useEffect } from "react";
import styles from "./ChatSection.module.css";
import { Button, Spin } from "antd";
import ChatMessenger from "./ChatMessenger";

export interface IChatSection {
  context: string;
  onSubmit?: () => any;
  customerInfo: {
    name: string;
  };
  initialCustomerSupportMessage: string;
}

export type chatPersonas = "system" | "assistant" | "user";
export interface IChatMessages {
  role: chatPersonas;
  content: string;
}

const ChatSection = (props: IChatSection) => {
  const { context, customerInfo, initialCustomerSupportMessage } = props;
  const initialChatValue: IChatMessages[] = [
    {
      role: "system",
      content: context,
    },
    { role: "user" as chatPersonas, content: initialCustomerSupportMessage },
  ];

  return (
    <>
      <ChatMessenger
        initialChatValue={initialChatValue}
        customerName={customerInfo.name}
      />
    </>
  );
};

export default ChatSection;
