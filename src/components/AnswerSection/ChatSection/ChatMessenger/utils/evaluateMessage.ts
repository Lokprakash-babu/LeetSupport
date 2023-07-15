import { IChatMessages } from "../../ChatSection"

export const evaluateMessage = async({
    allMessages,
    evaluationPrompt
}:{
    allMessages:IChatMessages[],
    evaluationPrompt: string
}) => {
    const systemConfigMessage = {
        role:"system",
        content:evaluationPrompt
    };
    const userMessages = allMessages.filter((message)=>message.role==="user");
    const messagePayload = [systemConfigMessage, {
        role:"user",
        content: userMessages.map((message)=>{
            return `role:${message.role}, content:${message.content}`
        }).join(";")
    }]
    const evaluationPayload =  {
        model: "gpt-3.5-turbo",
        messages: messagePayload,
      };
    const response = await fetch(`${process.env.NEXT_PUBLIC_OPENAI_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
        },
        body: JSON.stringify(evaluationPayload),
      }); 
    const jsonResponse = await response.json();
    const choice = jsonResponse.choices[0].message;
    return choice;
}


export const LanguageProficiencyAssessement = async(chatMessages: IChatMessages[]) => {
    const languageEvaluationPrompt = "You are a customer support manager, evaluate the language proficiency for the messages in first person view. Provide feedback for improvement. Keep it brief not exceeding 200 words"

    const response = await evaluateMessage({
        allMessages: chatMessages,
        evaluationPrompt: languageEvaluationPrompt
    });
    return response;
}

export const ToneProficiencyAnalysis = async(chatMessages: IChatMessages[]) => {
    const languageEvaluationPrompt = "You are a customer support manager, evaluate the tone for the messages in first person view. Provide feedback for improvement. Keep it brief not exceeding 200 words";

    const response = await evaluateMessage({
        allMessages: chatMessages,
        evaluationPrompt: languageEvaluationPrompt
    });
    return response;
}
export const OverallFeedbackProficiency = async(chatMessages: IChatMessages[]) => {
    const languageEvaluationPrompt = "You are a customer support manager, evaluate the overall feedback for the messages in first person view. Provide feedback for improvement. Keep it brief not exceeding 200 words"

    const response = await evaluateMessage({
        allMessages: chatMessages,
        evaluationPrompt: languageEvaluationPrompt
    });
    return response;
}