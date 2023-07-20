import { Button, Tabs } from "antd";
import styles from "../ChatSection/ChatSection.module.css";
import { useState, useEffect } from "react";
import FeedbackLoader from "../ChatSection/ChatMessenger/FeedbackLoader";
import {
  LanguageProficiencyAssessement,
  OverallFeedbackProficiency,
  ToneProficiencyAnalysis,
} from "../../../utils/evaluateMessage";
import { IChatMessages } from "../ChatSection/ChatSection";
const EmailLanguageProficiency = (props: { emailContent: string }) => {
  const { emailContent } = props;
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
    const languageProficiencyResult = await LanguageProficiencyAssessement([
      {
        role: "user",
        content: emailContent,
      },
    ]);
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
const EmailToneLanguageProficiency = (props: { emailContent: string }) => {
  const { emailContent } = props;
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
    const toneProficiencyResult = await ToneProficiencyAnalysis([
      {
        role: "user",
        content: emailContent,
      },
    ]);
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
const EmailOverallFeedback = (props: { emailContent: string }) => {
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
    const overallFeedbackResult = await OverallFeedbackProficiency([
      {
        role: "user",
        content: props.emailContent,
      },
    ]);
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

const EmailFeedback = (props: {
  emailContent: string;
  resetEmail: () => any;
}) => {
  const { emailContent } = props;
  const tabItems = [
    {
      label: "Language Proficiency",
      key: "languageProficience",
      children: <EmailLanguageProficiency emailContent={emailContent} />,
    },
    {
      label: "Tone Analysis",
      key: "toneAnalysis",
      children: <EmailToneLanguageProficiency emailContent={emailContent} />,
    },
    {
      label: "Overall Feedback",
      key: "overallFeedback",
      children: <EmailOverallFeedback emailContent={emailContent} />,
    },
  ];
  return (
    <>
      <div className={`${styles.chatFeedbackContainer}`}>
        <Tabs items={tabItems} />
      </div>
      <Button onClick={props.resetEmail}>Retry!</Button>
    </>
  );
};

export default EmailFeedback;
