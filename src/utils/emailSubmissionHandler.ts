import { chatPersonas } from "@/components/AnswerSection/ChatSection/ChatSection";
import {
  LanguageProficiencyAssessement,
  OverallFeedbackProficiency,
  ToneProficiencyAnalysis,
} from "./evaluateMessage";
import { createSubmission } from "./gqlApi";

export interface IEmailSubmissionHandler {
  nonFormattedEmail: string;
  formattedEmail: string;
  userEmail: string;
  problemId: string;
}
export const emailSubmissionHandler = async (args: IEmailSubmissionHandler) => {
  const { nonFormattedEmail, problemId, formattedEmail, userEmail } = args;
  const answerResponse = [
    {
      role: "user" as chatPersonas,
      content: formattedEmail,
    },
  ];
  const feedbacks = await Promise.all([
    LanguageProficiencyAssessement(answerResponse),
    ToneProficiencyAnalysis(answerResponse),
    OverallFeedbackProficiency(answerResponse),
  ]);

  const response = await createSubmission({
    user: userEmail,
    problemId,
    response: JSON.stringify({
      nonFormattedEmail,
      formattedEmail,
    }),
    languageFeedback: JSON.stringify(feedbacks[0]),

    toneFeedback: JSON.stringify(feedbacks[1]),

    overallFeedback: JSON.stringify(feedbacks[2]),
  });
  return response;
};
