import PageHead from "@/components/PageHead/PageHead";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import ProblemSection from "@/components/ProblemSection/ProblemSection";
import { useRouter } from "next/router";
import styles from "@styles/[practiceId].module.css";
import ChatSection from "@/components/AnswerSection/ChatSection/ChatSection";
import NotFound from "@/components/NotFound/NotFound";
import EmailSection from "@/components/AnswerSection/EmailSection/EmailSection";
import { useAuth } from "@/components/Auth";
import { Tabs } from "antd";
import { useSidebarContext } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { emailSubmissionHandler } from "@/utils/emailSubmissionHandler";
import Error from "@/components/Error";
import SubmissionSummary from "@/components/Submission/SubmissionSummary";
import { problems } from "@/constants/problems";

export interface ISubmissionHandler {
  chat?: string;
  email?: {
    formattedContent: string;
    unFormattedContent: string;
  };
}
const AnswerContainer = (props: {
  problem: any;
  onSuccessfulSubmit: (args?: any) => void;
}) => {
  const { problem } = props;
  const problemType = problem.category.category;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authenticatedUser } = useAuth();
  const [error, setError] = useState("");
  const onSubmitHandler = async (value: ISubmissionHandler) => {
    setIsSubmitting(true);

    try {
      const response = await emailSubmissionHandler({
        formattedEmail: value.email?.formattedContent || "",
        nonFormattedEmail: value.email?.unFormattedContent || "",
        problemId: problem.id,
        userEmail: authenticatedUser?.attributes?.email,
      });
      setIsSubmitting(false);
      props.onSuccessfulSubmit(response);
    } catch (err: any) {
      setError(err);
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <p>Your response is being submitted...</p>;
  }
  if (error) {
    return <Error />;
  }
  switch (problemType) {
    case "chat":
      return (
        <ChatSection
          context={problem.context}
          initialCustomerSupportMessage={problem.initialSupportMessage}
          customerInfo={problem.customerInfo}
        />
      );
    case "email":
      return <EmailSection onSubmitHandler={onSubmitHandler} />;
    default:
      return <></>;
  }
};
const PracticeDetails = () => {
  const router = useRouter();
  const { practiceId = "" } = router.query;
  //@ts-ignore
  const practiceProblem = problems[practiceId];
  const { collapseSidebar } = useSidebarContext();
  const [activeKey, setActiveKey] = useState("description");
  const [isLoading, setIsLoading] = useState(false);
  const { authenticatedUser, authLoading } = useAuth();

  useEffect(() => {
    collapseSidebar?.();
    // getAllSubmissions();
  }, []);

  if (authLoading || isLoading) {
    return <p>Loading...</p>;
  }
  if (!practiceProblem) {
    return <NotFound />;
  }

  // if (error) {
  //   return <Error />;
  // }
  const tabItems = [
    {
      key: "description",
      label: "Description",
      children: (
        <ProblemSection
          category={practiceProblem.category.category}
          companiesAskedIn={["Amazon"]}
          description={practiceProblem.problemDescription}
          difficulty={practiceProblem.difficulty}
          expectations={practiceProblem.expectations}
        />
      ),
    },
    {
      key: "submissions",
      label: "Submissions",
      children: <SubmissionSummary problemId={practiceProblem.id} />,
    },
  ];

  return (
    <div>
      <PageHead
        pageName={practiceProblem.title}
        backRoute="/practice"
        withBackBtn
      />
      <PageWrapper>
        <div className={styles.container}>
          <div className={styles.problemSection}>
            <Tabs
              defaultActiveKey="description"
              items={tabItems}
              activeKey={activeKey}
              onTabClick={(tabKey) => {
                setActiveKey(tabKey);
              }}
            />
          </div>
          {activeKey !== "submissions" && (
            <div className={styles.solutionSection}>
              <AnswerContainer
                problem={practiceProblem}
                onSuccessfulSubmit={() => setActiveKey("submissions")}
              />
            </div>
          )}
        </div>
      </PageWrapper>
    </div>
  );
};

export default PracticeDetails;
