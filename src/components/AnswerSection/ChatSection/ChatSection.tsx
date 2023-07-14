import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ChatSection.module.css";
import { Spin } from "antd";

export interface IChatSection {
  context: string;
  onSubmit?: () => any;
  customerInfo: {
    name: string;
  };
  initialCustomerSupportMessage: string;
}

type chatPersonas = "system" | "assistant" | "user";
interface IChatMessages {
  role: chatPersonas;
  content: string;
}

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

const LoadingChatMessage = () => {
  return (
    <div className={`${styles.chatLoadingContainer}`}>
      <Spin />
    </div>
  );
};

const postMessage = async (
  previousMessages: IChatMessages[],
  newMessage: string,
  addRemainder?: boolean
) => {
  const newMessageWithRole = {
    role: "user" as chatPersonas,
    content: newMessage,
  };
  try {
    const messagePayload = [
      ...previousMessages,
      addRemainder
        ? {
            role: "system",
            content:
              "Remember, you are a customer who received wrong pizza order",
          }
        : null,
      newMessageWithRole,
    ].filter((message) => !!message);
    const chatPayload = {
      model: "gpt-3.5-turbo",
      messages: messagePayload,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_OPENAI_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
      },
      body: JSON.stringify(chatPayload),
    });
    const jsonResponse = await response.json();
    const returnResponse = jsonResponse.choices[0].message;
    return returnResponse;
  } catch (err) {
    console.log(err);
  }
};
const ChatSection = (props: IChatSection) => {
  const {
    context = "You are an angry customer who didn't get proper pizza delivered. You are in conversation with support agent of that particular company, you have to keep your messages short and concise not exceeding 70 words",
    onSubmit,
    customerInfo,
    initialCustomerSupportMessage = "Hello! I am Joey! How can I help you.",
  } = props;
  const [chatMessages, setChatMessages] = useState<IChatMessages[]>([
    {
      role: "system",
      content: context,
    },
    { role: "user" as chatPersonas, content: initialCustomerSupportMessage },
  ]);
  const [userTypedMessage, setUserTypedMessage] = useState("");
  const [isChatLoading, setChatLoading] = useState(false);

  const initiateChat = useCallback(async () => {
    setChatLoading(true);
    const response = await postMessage(
      [
        {
          role: "system",
          content: context,
        },
      ],
      initialCustomerSupportMessage
    );
    setChatMessages([...chatMessages, response]);
    setChatLoading(false);
  }, []);
  const submitMessage = async (event: any) => {
    event.preventDefault();
    setChatLoading(true);
    setChatMessages([
      ...chatMessages,
      { role: "user", content: userTypedMessage },
    ]);
    const responseMessage = await postMessage(
      [...chatMessages],
      userTypedMessage,
      true
    );
    setChatMessages([
      ...chatMessages,
      { role: "user", content: userTypedMessage },
      { ...responseMessage },
    ]);
    setUserTypedMessage("");
    setChatLoading(false);
  };

  const anchorRef = useRef(null);
  useEffect(() => {
    if (anchorRef && anchorRef?.current) {
      //@ts-ignore
      anchorRef.current.scrollTop = anchorRef.current.scrollHeight;
    }
  }, [chatMessages]);
  useEffect(() => {
    initiateChat();
  }, []);
  return (
    <div className={`${styles.chatContainer}`}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderTitle}>
          <h4>Test customer name</h4>
        </div>
      </div>
      <div className={styles.chatMessagesContainer} ref={anchorRef}>
        {chatMessages.map((message, index) => {
          if (message.role === "system") {
            return <></>;
          }
          return <ChatMessage {...message} key={index} />;
        })}
        {isChatLoading && <LoadingChatMessage />}
      </div>
      <form className={`${styles.chatFooter}`} onSubmit={submitMessage}>
        <input
          type="text"
          value={userTypedMessage}
          placeholder="Enter your message"
          className={styles.chatInput}
          onChange={(e) => {
            setUserTypedMessage(e.target.value);
          }}
          disabled={isChatLoading}
        />
        <button
          type="submit"
          className={styles.chatButton}
          onClick={() => null}
          disabled={isChatLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatSection;
