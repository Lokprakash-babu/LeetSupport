import { Button } from "antd";
import styles from "./EmailSection.module.css";
export interface IEmailFooter {
  onClick: () => any;
  textContent: string;
}

const EmailFooter = (props: IEmailFooter) => {
  return (
    <div className={styles.emailFooter}>
      <div>Number of Characters: {props.textContent.length}</div>
      <Button onClick={props.onClick} type="primary">
        Send
      </Button>
    </div>
  );
};

export default EmailFooter;
