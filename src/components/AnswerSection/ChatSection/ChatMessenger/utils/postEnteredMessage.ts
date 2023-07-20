import { IChatMessages } from "../../ChatSection";
import { postMessage } from "@utils/postMessage";

export const postTheEnteredMessge = async ({
  previousMessages,
  newMessage,
}: {
  previousMessages: IChatMessages[];
  newMessage: string;
}) => {
  const response: IChatMessages = await postMessage(
    previousMessages,
    newMessage
  );
  return response;
};
