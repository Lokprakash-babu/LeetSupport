import { IChatMessages } from "@/components/AnswerSection/ChatSection/ChatSection";
import {
  LanguageProficiencyAssessement,
  OverallFeedbackProficiency,
  ToneProficiencyAnalysis,
} from "./evaluateMessage";
import { createSubmission } from "./gqlApi";

export interface IChatSubmissionHandler {
  chatMessages: IChatMessages[];
  userEmail: string;
  problemId: string;
}
export const chatSubmissionHandler = async ({
  chatMessages,
  userEmail,
  problemId,
}: IChatSubmissionHandler) => {
  const feedbacks = await Promise.all([
    LanguageProficiencyAssessement(chatMessages),
    ToneProficiencyAnalysis(chatMessages),
    OverallFeedbackProficiency(chatMessages),
  ]);

  const response = await createSubmission({
    user: userEmail,
    problemId,
    response: JSON.stringify({
      response: chatMessages,
    }),
    languageFeedback: JSON.stringify(feedbacks[0]),

    toneFeedback: JSON.stringify(feedbacks[1]),

    overallFeedback: JSON.stringify(feedbacks[2]),
  });
  return response;
};
