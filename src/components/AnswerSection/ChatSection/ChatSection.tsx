import { ISubmissionHandler } from "@/pages/practice/[practiceId]";
import ChatMessenger from "./ChatMessenger";

export interface IChatSection {
  context: string;
  onSubmitHandler: (args?: ISubmissionHandler) => void;
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

  const systemChatMessage: IChatMessages = {
    role: "system",
    content: context,
  };
  const initialUserMessage: IChatMessages = {
    role: "user" as chatPersonas,
    content: initialCustomerSupportMessage,
  };
  return (
    <>
      <ChatMessenger
        systemChatMessage={systemChatMessage}
        initialUserMessage={initialUserMessage}
        customerName={customerInfo.name}
        onSubmitHandler={props.onSubmitHandler}
      />
    </>
  );
};

export default ChatSection;
