import React, { useEffect, useRef } from "react";
import styles from "../ChatSection.module.css";
import { IChatMessages } from "../ChatSection";
import ChatMessage from "./ChatMessage";
import LoadingChatMessage from "./LoadingChatMessage";

export interface IChatMessagesContainer {
  chatMessages: IChatMessages[];
  isChatLoading?: boolean;
  initiateChat?: () => void;
  isReadOnly?: boolean;
}
const ChatMessagesContainer = ({
  chatMessages,
  isChatLoading,
  initiateChat,
  isReadOnly,
}: IChatMessagesContainer) => {
  const anchorRef = useRef(null);

  useEffect(() => {
    if (anchorRef && anchorRef?.current) {
      //@ts-ignore
      anchorRef.current.scrollTop = anchorRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (initiateChat && !isReadOnly) {
      initiateChat();
    }
  }, [initiateChat, isReadOnly]);
  return (
    <div className={styles.chatMessagesContainer} ref={anchorRef}>
      {chatMessages.map((message, index) => {
        if (message.role === "system") {
          return <React.Fragment key={index}></React.Fragment>;
        }
        return <ChatMessage {...message} key={index} />;
      })}
      {isChatLoading && <LoadingChatMessage />}
    </div>
  );
};

export default ChatMessagesContainer;
