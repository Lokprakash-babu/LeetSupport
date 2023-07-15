import React, { useContext, useEffect, useState } from "react";
import { ChatMessengerContext } from ".";
import { IChatMessages } from "../ChatSection";
import FeedbackLoader from "./FeedbackLoader";
import { ToneProficiencyAnalysis } from "./utils/evaluateMessage";

const ToneAnalysis = () => {
  const { chatMessages } = useContext(ChatMessengerContext);
  const [toneProficiency, settoneProficiency] = useState<{
    loading: boolean;
    content: IChatMessages;
  }>({
    loading: false,
    content: {
      role: "assistant",
      content: "",
    },
  });

  const assessToneProficiency = async () => {
    settoneProficiency({
      ...toneProficiency,
      loading: true,
    });
    const toneProficiencyResult = await ToneProficiencyAnalysis(
      chatMessages as IChatMessages[]
    );
    settoneProficiency({
      loading: false,
      content: toneProficiencyResult,
    });
  };
  useEffect(() => {
    assessToneProficiency();
  }, []);
  return (
    <div>
      {toneProficiency.loading && (
        <FeedbackLoader prompt="Tone analysis is under progress!!!" />
      )}
      {!toneProficiency.loading && <p>{toneProficiency.content.content}</p>}
    </div>
  );
};

export default ToneAnalysis;
