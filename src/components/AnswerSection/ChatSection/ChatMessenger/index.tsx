import { Button, Spin } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../ChatSection.module.css";
import { IChatMessages } from "../ChatSection";
import ChatMessage from "./ChatMessage";
import LoadingChatMessage from "./LoadingChatMessage";
import ChatInput from "./ChatInput";
import { postMessage } from "../../../../utils/postMessage";
import ChatFeedback from "./ChatFeeback";

export interface IChatMessenger {
  initialChatValue: IChatMessages[];
  customerName: string;
}

const postTheEnteredMessge = async ({
  previousMessages,
  newMessage,
  beforeSubmission,
  afterSubmission,
}: {
  previousMessages: IChatMessages[];
  newMessage: string;
  beforeSubmission: () => any;
  afterSubmission: (val: any) => any;
}) => {
  beforeSubmission();
  const response: IChatMessages = await postMessage(
    previousMessages,
    newMessage
  );
  afterSubmission(response);
  return;
};

const initiateChat = async ({
  initialChatValue,
  afterInitiate,
  beforeInitiate,
}: {
  initialChatValue: IChatMessages[];
  afterInitiate: (val: IChatMessages) => void;
  beforeInitiate: () => void;
}) => {
  beforeInitiate();
  const response: IChatMessages = await postMessage(initialChatValue, "");
  afterInitiate(response);
  return;
};

const messageLimitationTracker = ({
  allMessages,
}: {
  allMessages: IChatMessages[];
}) => {
  const userMessages = allMessages.filter((message) => message.role === "user");
  if (userMessages.length > 5) {
    return true;
  }
  return false;
};

export interface IChatMessengerContext {
  chatMessages?: IChatMessages[];
  resetChat?: () => void;
}
export const ChatMessengerContext = React.createContext<IChatMessengerContext>(
  {}
);

const ChatMessenger = ({ initialChatValue, customerName }: IChatMessenger) => {
  const [chatMessages, setChatMessages] =
    useState<IChatMessages[]>(initialChatValue);
  const [isChatLoading, setChatLoading] = useState(false);
  const anchorRef = useRef(null);
  const [userTypedMessage, setUserTypedMessage] = useState("");
  const [showChatFeedback, setShowChatFeedback] = useState(false);
  useEffect(() => {
    if (anchorRef && anchorRef?.current) {
      //@ts-ignore
      anchorRef.current.scrollTop = anchorRef.current.scrollHeight;
    }
  }, [chatMessages]);

  //This will be called when the support agent clicks endchat.
  const terminateChat = () => {
    //Show chat feedback
    //Evaluate message
    setShowChatFeedback(true);
  };
  const chatSubmission = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newChatMessage: IChatMessages[] = [
      ...chatMessages,
      { role: "user", content: userTypedMessage },
    ];
    const isLimitationExceeded = messageLimitationTracker({
      allMessages: newChatMessage,
    });
    if (isLimitationExceeded) {
      terminateChat();
      return;
    } else {
      postTheEnteredMessge({
        previousMessages: chatMessages,
        newMessage: userTypedMessage,
        beforeSubmission() {
          setChatMessages([...newChatMessage]);
          setChatLoading(true);
          setUserTypedMessage("");
        },
        afterSubmission(botResponse) {
          setChatMessages([...newChatMessage, { ...botResponse }]);
          setChatLoading(false);
        },
      });
    }
  };
  useEffect(() => {
    initiateChat({
      initialChatValue: chatMessages,
      beforeInitiate() {
        setChatLoading(true);
      },
      afterInitiate(botResponse) {
        setChatLoading(false);
        setChatMessages([...chatMessages, { ...botResponse }]);
      },
    });
  }, []);

  const resetChat = () => {
    setChatMessages(initialChatValue);
    setUserTypedMessage("");
    initiateChat({
      initialChatValue: initialChatValue,
      beforeInitiate() {
        setChatLoading(true);
        setShowChatFeedback(false);
      },
      afterInitiate(botResponse) {
        setChatLoading(false);
        setChatMessages((historyMessages) => [
          ...historyMessages,
          { ...botResponse },
        ]);
      },
    });
  };
  return (
    <ChatMessengerContext.Provider
      value={{
        chatMessages,
        resetChat,
      }}
    >
      {!showChatFeedback && (
        <div className={`${styles.chatContainer}`}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderTitle}>
              <h4>{customerName}</h4>
              <Button danger onClick={terminateChat}>
                End Chat
              </Button>
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
          <form className={`${styles.chatFooter}`} onSubmit={chatSubmission}>
            <ChatInput
              onChange={(e) => {
                setUserTypedMessage(e.target.value);
              }}
              value={userTypedMessage}
              isDisabled={isChatLoading}
            />
            <button
              type="submit"
              className={styles.chatButton}
              disabled={isChatLoading}
            >
              Send
            </button>
          </form>
        </div>
      )}
      {showChatFeedback && <ChatFeedback />}
    </ChatMessengerContext.Provider>
  );
};

export default ChatMessenger;
