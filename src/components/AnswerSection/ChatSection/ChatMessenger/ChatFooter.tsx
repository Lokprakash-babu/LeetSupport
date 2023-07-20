import ChatInput from "./ChatInput";
import styles from "../ChatSection.module.css";
import { useState } from "react";
export interface IChatFooterProps {
  isDisabled?: boolean;
  onSend: (userEnteredMessage: string) => void;
}
const ChatFooter = (props: IChatFooterProps) => {
  const [userTypedMessage, setUserTypedMessage] = useState("");
  return (
    <form
      className={`${styles.chatFooter}`}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSend(userTypedMessage);
        setUserTypedMessage("");
      }}
    >
      <ChatInput
        onChange={(e) => {
          setUserTypedMessage(e.target.value);
        }}
        value={userTypedMessage}
        isDisabled={props.isDisabled}
      />
      <button
        type="submit"
        className={styles.chatButton}
        disabled={props.isDisabled || !userTypedMessage}
      >
        Send
      </button>
    </form>
  );
};

export default ChatFooter;
