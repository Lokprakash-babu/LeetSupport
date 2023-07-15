import { IChatMessages } from "../ChatSection";
import styles from "../ChatSection.module.css";
import { Button, Tabs } from "antd";
import LanguageProficiency from "./LanguageProficiency";
import ToneAnalysis from "./ToneAnalysis";
import OverallFeedback from "./OverallFeedback";
import { useContext } from "react";
import { ChatMessengerContext } from ".";

export interface IChatFeedback {
  chatMessages: IChatMessages[];
}

const tabItems = [
  {
    label: "Language Proficiency",
    key: "languageProficience",
    children: <LanguageProficiency />,
  },
  {
    label: "Tone Analysis",
    key: "toneAnalysis",
    children: <ToneAnalysis />,
  },
  {
    label: "Overall Feedback",
    key: "overallFeedback",
    children: <OverallFeedback />,
  },
];
const ChatFeeback = () => {
  const { resetChat } = useContext(ChatMessengerContext);
  return (
    <>
      <div className={`${styles.chatFeedbackContainer}`}>
        <Tabs items={tabItems} />
      </div>
      <Button onClick={resetChat}>Retry!</Button>
    </>
  );
};

export default ChatFeeback;
