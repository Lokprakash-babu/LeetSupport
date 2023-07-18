import EmailEditor from "./EmailEditor";

export interface ISubmitHander {
  chat?: string;
  email?: {
    formattedContent: string;
    unFormattedContent: string;
  };
}
export interface IEmailSection {
  onSubmitHandler: (args: ISubmitHander) => void;
}
const EmailSection = (props: IEmailSection) => {
  return (
    <>
      <EmailEditor onSubmit={props.onSubmitHandler} />
    </>
  );
};

export default EmailSection;
