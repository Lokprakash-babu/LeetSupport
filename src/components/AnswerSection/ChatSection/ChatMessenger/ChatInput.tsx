import { useRef, useState } from "react";
import styles from "../ChatSection.module.css";

export interface IChatInput {
  isDisabled?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const ChatInput = (props: IChatInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { placeholder = "Enter your message" } = props;
  return (
    <input
      type="text"
      value={props.value}
      placeholder={placeholder}
      className={styles.chatInput}
      onChange={props.onChange}
      disabled={props.isDisabled}
      ref={inputRef}
      maxLength={150}
    />
  );
};

export default ChatInput;
