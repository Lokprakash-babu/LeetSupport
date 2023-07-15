import { IChatMessages } from "../ChatSection";
import styles from "../ChatSection.module.css";

const ChatMessage = (props: IChatMessages) => {
  const { role, content } = props;
  return (
    <div
      className={`${styles.chatMessageBlob} ${
        role === "user" ? styles.userFlexDirection : styles.botFlexDirection
      }`}
    >
      <div
        className={`${styles.chatMessageText} ${
          role === "user" ? styles.userText : styles.botText
        }`}
      >
        {content}
      </div>
    </div>
  );
};
export default ChatMessage;
