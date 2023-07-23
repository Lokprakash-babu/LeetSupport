import { Auth } from "aws-amplify";
import {
  IChatMessages,
  chatPersonas,
} from "../components/AnswerSection/ChatSection/ChatSection";

export const postMessage = async (
  previousMessages: IChatMessages[],
  newMessage: string,
  addRemainder?: string
) => {
  const newMessageWithRole = {
    role: "user" as chatPersonas,
    content: newMessage || "",
  };
  try {
    const messagePayload = [...previousMessages];
    if (addRemainder) {
      messagePayload.push({
        role: "system",
        content: addRemainder,
      });
    }
    if (newMessage) {
      messagePayload.push(newMessageWithRole);
    }
    const chatPayload = {
      model: "gpt-3.5-turbo",
      messages: messagePayload,
    };
    const access = await Auth.currentAuthenticatedUser();
    const accessToken = access.signInUserSession.accessToken.jwtToken;
    const response = await fetch(`${process.env.NEXT_PUBLIC_COMPLETION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
