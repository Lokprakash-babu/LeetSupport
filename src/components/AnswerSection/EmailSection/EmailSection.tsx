import { useState } from "react";
import EmailEditor from "./EmailEditor";
import EmailFeedback from "./EmailFeedback";

const EmailSection = () => {
  const [showEmailFeedback, setShowEmailFeedback] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  return (
    <>
      {!showEmailFeedback && (
        <EmailEditor
          onSubmit={(enterEmail) => {
            setSubmittedEmail(enterEmail);
            setShowEmailFeedback(true);
          }}
        />
      )}
      {showEmailFeedback && (
        <EmailFeedback
          emailContent={submittedEmail}
          resetEmail={() => {
            setShowEmailFeedback(false);
          }}
        />
      )}
    </>
  );
};

export default EmailSection;
