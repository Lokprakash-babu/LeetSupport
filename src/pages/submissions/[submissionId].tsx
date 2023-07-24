import EmailEditor from "@/components/AnswerSection/EmailSection/EmailEditor";
import Error from "@/components/Error";
import NotFound from "@/components/NotFound/NotFound";
import PageHead from "@/components/PageHead/PageHead";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Feedback from "@/components/Submission/Feedback";
import { problems } from "@/constants/problems";
import { GET_SUBMISSION } from "@/graphql/queries";
import { useQuery } from "@/hooks/useQuery";
import { useEffect } from "react";
import styles from "@styles/[submissionId].module.css";
import ChatMessenger from "@/components/AnswerSection/ChatSection/ChatMessenger";
import Loader from "@/components/Loader";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/router";

const MountUser = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/user");
  }, []);
  return null;
};
const SubmissionDetails = () => {
  const router = useRouter();
  const { submissionId } = router.query;
  const { authenticatedUser, authLoading } = useAuth();
  const { data, error, loading, queryHandler } = useQuery(GET_SUBMISSION);

  useEffect(() => {
    if (submissionId) {
      queryHandler({
        variables: {
          id: submissionId as string,
        },
      });
    }
  }, [submissionId]);

  if (!authenticatedUser) {
    return <MountUser />;
  }

  if (authLoading || loading) {
    return <Loader />;
  }
  if (error) {
    return <Error />;
  }
  if (!submissionId || !data) {
    return <NotFound />;
  }
  const {
    data: {
      getSUBMISSION: {
        problemId,
        toneFeedback,
        response,
        overallFeedback,
        languageFeedback,
      },
    },
  } = data;
  const {
    category: { category },
  } = problems[problemId as keyof typeof problems];

  const jsonResponse = JSON.parse(response);
  const emailResponse = category === "email" ? jsonResponse.formattedEmail : "";

  const chatResponse =
    category === "chat" ? jsonResponse.response.slice(2) : [];

  return (
    <>
      <PageHead
        pageName={`Submission: ${submissionId}`}
        withBackBtn
        backRoute="/submissions"
      />
      <PageWrapper>
        <div className={styles.feedbackSection}>
          <div className={styles.feedbackContainer}>
            <Feedback
              language={languageFeedback}
              tone={toneFeedback}
              overall={overallFeedback}
            />
          </div>
          <div className={styles.answerContainer}>
            {category === "email" && (
              <EmailEditor initialValue={emailResponse} />
            )}
            {category === "chat" && (
              <ChatMessenger
                initialUserMessage={jsonResponse.response[1]}
                systemChatMessage={jsonResponse.response[0]}
                defaultValues={chatResponse}
                customerName="Honest Customer"
                isReadOnly
              />
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default SubmissionDetails;
