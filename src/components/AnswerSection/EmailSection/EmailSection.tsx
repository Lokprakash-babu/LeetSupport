import { useState } from "react";
import EmailEditor from "./EmailEditor";
import EmailFeedback from "./EmailFeedback";
import { createSubmission } from "@/utils/gqlApi";
import { useAuth } from "@/components/Auth";

const EmailSection = () => {
  const [showEmailFeedback, setShowEmailFeedback] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const { authenticatedUser } = useAuth();
  const loggedInUserEmail = authenticatedUser?.attributes?.email;
  const emailSubmitHandler = async (enteredEmail: string) => {
    setSubmittedEmail(enteredEmail);
    //Create email submission
    // setShowEmailFeedback(true);
    const response = await createSubmission({
      user: loggedInUserEmail,
      problemId: "support-person-and-tech-problems",
      response: enteredEmail,
    });
    console.log("response", response);
  };
  return (
    <>
      {!showEmailFeedback && <EmailEditor onSubmit={emailSubmitHandler} />}
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
