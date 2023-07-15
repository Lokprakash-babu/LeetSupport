import { Spin } from "antd";
import styles from "../ChatSection.module.css";
const LoadingChatMessage = () => {
  return (
    <div className={`${styles.chatLoadingContainer}`}>
      <Spin />
    </div>
  );
};
export default LoadingChatMessage;
