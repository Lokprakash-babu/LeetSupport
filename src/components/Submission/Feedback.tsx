import { Collapse } from "antd";
import React from "react";

export interface IFeedback {
  tone: string;
  language: string;
  overall: string;
}
const Feedback = ({ tone, language, overall }: IFeedback) => {
  const languageFeedback = JSON.parse(language);
  const toneFeedback = JSON.parse(tone);
  const overallFeedback = JSON.parse(overall);
  const collapsibleItems = [
    {
      key: "languageFeedback",
      label: "View Language Feedback",
      children: <pre>{languageFeedback.content}</pre>,
    },
    {
      key: "toneFeedback",
      label: "View Tone Feedback",
      children: <pre>{toneFeedback.content}</pre>,
    },
    {
      key: "overallFeedback",
      label: "View Overall Feedback",
      children: <pre>{overallFeedback.content}</pre>,
    },
  ];
  return (
    <Collapse
      items={collapsibleItems}
      defaultActiveKey={["overallFeedback"]}
      accordion
    />
  );
};

export default Feedback;
