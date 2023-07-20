import EmailEditor from "./EmailEditor";
import { ISubmissionHandler } from "../../../pages/practice/[practiceId]";
export interface IEmailSection {
  onSubmitHandler: (args: ISubmissionHandler) => void;
}
const EmailSection = (props: IEmailSection) => {
  return (
    <>
      <EmailEditor onSubmit={props.onSubmitHandler} />
    </>
  );
};

export default EmailSection;
