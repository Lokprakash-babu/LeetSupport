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
  const {
    context = "You are an angry customer who didn't get proper pizza delivered. You are in conversation with support agent of that particular company, you have to keep your messages short and concise not exceeding 70 words",
    onSubmit,
    customerInfo,
    initialCustomerSupportMessage = "Hello! I am Joey! How can I help you.",
  } = props;
  const initialChatValue: IChatMessages[] = [
    {
      role: "system",
      content: context,
    },
    { role: "user" as chatPersonas, content: initialCustomerSupportMessage },
  ];

  return (
    <>
      <ChatMessenger initialChatValue={initialChatValue} />
    </>
  );
};

export default ChatSection;
