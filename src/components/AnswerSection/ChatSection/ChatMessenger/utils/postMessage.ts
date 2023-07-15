import { IChatMessages, chatPersonas } from "../../ChatSection";

export const postMessage = async (
    previousMessages: IChatMessages[],
    newMessage: string,
    addRemainder?: string,
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
          content:addRemainder,
        });
      }
      if (newMessage) {
        messagePayload.push(newMessageWithRole);
      }
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
    //   const jsonResponse = {
    //     choices: [
    //       {
    //         role: "assistant",
    //         message: "I am a customer who received wrong pizza order",
    //       },
    //     ],
    //   };
      const returnResponse = jsonResponse.choices[0].message;
      return returnResponse;
    } catch (err) {
      console.log(err);
    }
  };