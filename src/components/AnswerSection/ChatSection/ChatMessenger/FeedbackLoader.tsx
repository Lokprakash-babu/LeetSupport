import React from "react";
import styles from "../ChatSection.module.css";
import { Spin } from "antd";

export interface IFeedbackLoader {
  prompt: string;
}
const FeedbackLoader = (props: IFeedbackLoader) => {
  return (
    <div className={styles.chatFeedbackLoadingContainer}>
      <Spin />
      <p>{props.prompt}</p>
    </div>
  );
};

export default FeedbackLoader;
