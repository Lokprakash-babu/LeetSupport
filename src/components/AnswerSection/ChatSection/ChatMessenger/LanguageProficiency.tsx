import { useContext, useEffect, useState } from "react";
import { ChatMessengerContext } from ".";
import FeedbackLoader from "./FeedbackLoader";
import { LanguageProficiencyAssessement } from "../../../../utils/evaluateMessage";
import { IChatMessages } from "../ChatSection";

const LanguageProficiency = () => {
  const { chatMessages } = useContext(ChatMessengerContext);
  const [languageProficiency, setLanguageProficiency] = useState<{
    loading: boolean;
    content: IChatMessages;
  }>({
    loading: false,
    content: {
      role: "assistant",
      content: "",
    },
  });

  const assessLanguageProficiency = async () => {
    setLanguageProficiency({
      ...languageProficiency,
      loading: true,
    });
    const languageProficiencyResult = await LanguageProficiencyAssessement(
      chatMessages as IChatMessages[]
    );
    setLanguageProficiency({
      loading: false,
      content: languageProficiencyResult,
    });
  };
  useEffect(() => {
    assessLanguageProficiency();
  }, []);
  return (
    <div>
      {languageProficiency.loading && (
        <FeedbackLoader prompt="Language proficiency is under evaluation!!!" />
      )}
      {!languageProficiency.loading && (
        <p>{languageProficiency.content.content}</p>
      )}
    </div>
  );
};

export default LanguageProficiency;
