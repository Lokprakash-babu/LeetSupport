import { useState, createContext, useMemo } from "react";
import styles from "../ChatSection.module.css";
import { IChatMessages, chatPersonas } from "../ChatSection";
import ChatFooter from "./ChatFooter";
import ChatMessagesContainer from "./ChatMessagesContainer";
import ChatHeader from "./ChatHeader";
import { postTheEnteredMessge } from "./utils/postEnteredMessage";
import { ISubmissionHandler } from "@/pages/practice/[practiceId]";
import Error from "@/components/Error";
import { useNotificationContext } from "@/components/Notification";

export interface IChatMessenger {
  systemChatMessage: IChatMessages;
  initialUserMessage: IChatMessages;
  customerName: string;
  isReadOnly?: boolean;
  onSubmitHandler?: (args?: ISubmissionHandler) => void;
  defaultValues?: IChatMessages[];
}

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
  const [error, setError] = useState("");
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
      } catch (err: any) {
        setError(err.message);
        setChatLoading(false);
        console.log("error", err);
      }
    },
    [systemChatMessage, initialUserMessage]
  );
  const { warningNotification } = useNotificationContext();
  if (error) {
    return <Error />;
  }
  return (
    <div className={`${styles.chatContainer}`}>
      <ChatHeader
        customerName={customerName}
        onEndChat={() => {
          const totalChatMessages = chatMessages.filter((chatMessage) => {
            return chatMessage.role === "user";
          }).length;
          if (totalChatMessages > 2) {
            onSubmitHandler?.({
              chat: chatMessages,
            });
          } else {
            warningNotification?.({
              title: "Non Satisfactory attempt!",
              description: "Minimum number of messages is 2",
            });
          }
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
            try {
              const newMessage = {
                role: "user" as chatPersonas,
                content: userEnteredMessage,
              };
              const previousMessages = [...chatMessages];
              const isChatLimitReached =
                [...chatMessages, { ...newMessage }].filter((chatMessage) => {
                  return chatMessage.role === "user";
                }).length > 10;
              if (!isChatLimitReached) {
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
              } else {
                warningNotification?.({
                  description: "You've reached limitation of 10 messages",
                  title: "Chat Limitation Reached!",
                });
              }
            } catch (err: any) {
              setChatLoading(false);
              setError(err.message);
            }
          }}
          isDisabled={isChatLoading}
        />
      )}
    </div>
  );
};

export default ChatMessenger;
