import React from "react";

export interface ILanguage {
  languageFeedback: string;
  problemId?: string;
}
const Language = (props: ILanguage) => {
  return (
    <div>
      <h2>Language Feedback</h2>
      <div>{props.languageFeedback}</div>
    </div>
  );
};

export default Language;
