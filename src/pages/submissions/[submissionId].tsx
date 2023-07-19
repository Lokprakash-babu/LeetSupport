import EmailEditor from "@/components/AnswerSection/EmailSection/EmailEditor";
import Error from "@/components/Error";
import NotFound from "@/components/NotFound/NotFound";
import PageHead from "@/components/PageHead/PageHead";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Feedback from "@/components/Submission/Feedback";
import { problems } from "@/constants/problems";
import { GET_SUBMISSION } from "@/graphql/queries";
import { useQuery } from "@/hooks/useQuery";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

const SubmissionDetails = () => {
  const router = useRouter();
  const { submissionId } = router.query;

  //   const queryOptions = useMemo(() => {
  //     return {
  //       variables: {
  //         id: submissionId as string,
  //       },
  //     };
  //   }, [submissionId]);
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

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <p>Loading...</p>;
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
  const emailResponse = jsonResponse.formattedEmail;
  return (
    <>
      <PageHead pageName={`Submission: ${submissionId}`} />
      <PageWrapper>
        <Feedback
          language={languageFeedback}
          tone={toneFeedback}
          overall={overallFeedback}
        />
        <EmailEditor initialValue={emailResponse} />
      </PageWrapper>
    </>
  );
};

export default SubmissionDetails;
