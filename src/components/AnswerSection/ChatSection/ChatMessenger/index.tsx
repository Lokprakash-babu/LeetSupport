import {
  useState,
  createContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import styles from "../ChatSection.module.css";
import { IChatMessages, chatPersonas } from "../ChatSection";
import ChatFooter from "./ChatFooter";
import ChatMessagesContainer from "./ChatMessagesContainer";
import ChatHeader from "./ChatHeader";
import { postTheEnteredMessge } from "./utils/postEnteredMessage";
import { ISubmissionHandler } from "@/pages/practice/[practiceId]";

export interface IChatMessenger {
  systemChatMessage: IChatMessages;
  initialUserMessage: IChatMessages;
  customerName: string;
  isReadOnly?: boolean;
  onSubmitHandler?: (args?: ISubmissionHandler) => void;
  defaultValues?: IChatMessages[];
}

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
export const ChatMessengerContext = createContext<IChatMessengerContext>({});

const ChatMessenger = ({
  systemChatMessage,
  initialUserMessage,
  customerName,
  isReadOnly,
  onSubmitHandler,
  defaultValues,
}: IChatMessenger) => {
  const [chatMessages, setChatMessages] = useState<IChatMessages[]>([
    { ...systemChatMessage },
    { ...initialUserMessage },
    ...(defaultValues ? defaultValues : []),
  ]);
  const [isChatLoading, setChatLoading] = useState(false);

  const initiateChat = useMemo(
    () => async () => {
      setChatLoading(true);
      try {
        const response = await postTheEnteredMessge({
          previousMessages: [systemChatMessage],
          newMessage: initialUserMessage.content,
        });
        setChatMessages([...chatMessages, { ...response }]);
        setChatLoading(false);
      } catch (err) {
        console.log("error", err);
      }
    },
    [systemChatMessage, initialUserMessage]
  );
  return (
    <div className={`${styles.chatContainer}`}>
      <ChatHeader
        customerName={customerName}
        onEndChat={() => {
          onSubmitHandler?.({
            chat: chatMessages,
          });
        }}
        isReadOnlyMode={isReadOnly}
      />
      <ChatMessagesContainer
        chatMessages={chatMessages}
        isChatLoading={isChatLoading}
        initiateChat={initiateChat}
        isReadOnly={isReadOnly}
      />
      {!isReadOnly && (
        <ChatFooter
          onSend={async (userEnteredMessage) => {
            const newMessage = {
              role: "user" as chatPersonas,
              content: userEnteredMessage,
            };
            const previousMessages = [...chatMessages];
            setChatMessages([...chatMessages, { ...newMessage }]);

            setChatLoading(true);
            const response = await postTheEnteredMessge({
              previousMessages: [
                ...previousMessages,
                {
                  role: "system",
                  content: `Remember ${systemChatMessage.content}`,
                },
              ],
              newMessage: userEnteredMessage,
            });
            const newChatMessage = [
              ...previousMessages,
              { ...newMessage },
              { ...response },
            ];
            setChatMessages([...newChatMessage]);
            setChatLoading(false);
          }}
          isDisabled={isChatLoading}
        />
      )}
    </div>
  );
};

export default ChatMessenger;
