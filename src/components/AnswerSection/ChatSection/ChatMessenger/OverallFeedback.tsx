import React, { useContext, useEffect, useState } from "react";
import { ChatMessengerContext } from ".";
import { IChatMessages } from "../ChatSection";
import FeedbackLoader from "./FeedbackLoader";
import { OverallFeedbackProficiency } from "../../../../utils/evaluateMessage";

const OverallFeedback = () => {
  const { chatMessages } = useContext(ChatMessengerContext);
  const [overallFeedback, setoverallFeedback] = useState<{
    loading: boolean;
    content: IChatMessages;
  }>({
    loading: false,
    content: {
      role: "assistant",
      content: "",
    },
  });

  const assessoverallFeedback = async () => {
    setoverallFeedback({
      ...overallFeedback,
      loading: true,
    });
    const overallFeedbackResult = await OverallFeedbackProficiency(
      chatMessages as IChatMessages[]
    );
    setoverallFeedback({
      loading: false,
      content: overallFeedbackResult,
    });
  };
  useEffect(() => {
    assessoverallFeedback();
  }, []);
  return (
    <div>
      {overallFeedback.loading && (
        <FeedbackLoader prompt="Feedback is under progress!!!" />
      )}
      {!overallFeedback.loading && <p>{overallFeedback.content.content}</p>}
    </div>
  );
};

export default OverallFeedback;
