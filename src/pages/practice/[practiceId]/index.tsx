import PageHead from "@/components/PageHead/PageHead";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import ProblemSection from "@/components/ProblemSection/ProblemSection";
import { useRouter } from "next/router";
import styles from "@styles/[practiceId].module.css";
import ChatSection, {
  IChatMessages,
} from "@/components/AnswerSection/ChatSection/ChatSection";
import NotFound from "@/components/NotFound/NotFound";
import EmailSection from "@/components/AnswerSection/EmailSection/EmailSection";
import { useAuth } from "@/components/Auth";
import { Tabs } from "antd";
import { useSidebarContext } from "@/components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { emailSubmissionHandler } from "@/utils/emailSubmissionHandler";
import Error from "@/components/Error";
import { problems } from "@/constants/problems";
import { chatSubmissionHandler } from "@/utils/chatSubmissionHandler";
import Loader from "@/components/Loader";
import SubmissionsTable from "@/components/Submission/SubmissionsTable";
import Illustration from "@/components/Illustrations/Illustration";

export interface ISubmissionHandler {
  chat?: IChatMessages[];
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
  const onSubmitHandler = async (value?: ISubmissionHandler) => {
    setIsSubmitting(true);
    try {
      let response;
      if (problemType === "email") {
        response = await emailSubmissionHandler({
          formattedEmail: value?.email?.formattedContent || "",
          nonFormattedEmail: value?.email?.unFormattedContent || "",
          problemId: problem.id,
          userEmail: authenticatedUser?.attributes?.email,
        });
      } else if (problemType === "chat") {
        response = await chatSubmissionHandler({
          chatMessages: value?.chat || [],
          problemId: problem.id,
          userEmail: authenticatedUser?.attributes?.email,
        });
      }
      setIsSubmitting(false);
      props.onSuccessfulSubmit(response);
    } catch (err: any) {
      setError(err);
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Illustration name="customer-support" />
        <h2
          style={{
            textAlign: "center",
            marginTop: "1rem",
            width: "50%",
          }}
        >
          Your response is being submitted! This might take a while...
        </h2>
      </div>
    );
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
          onSubmitHandler={onSubmitHandler}
        />
      );
    case "email":
      return <EmailSection onSubmitHandler={onSubmitHandler} />;
    default:
      return <></>;
  }
};

const tabItems = [
  {
    key: "description",
    label: "Description",
  },
  {
    key: "submissions",
    label: "Submissions",
  },
];

const PracticeDetails = () => {
  const router = useRouter();
  const { practiceId, tab = "description" } = router.query;
  const { authenticatedUser, authLoading } = useAuth();
  //@ts-ignore
  const practiceProblem = problems[practiceId];
  const { collapseSidebar } = useSidebarContext();

  useEffect(() => {
    collapseSidebar?.();
  }, []);

  useEffect(() => {
    const isDescriptionTab = (tab as string) === "description";
    const isSubmissionTab = (tab as string) === "submissions";
    if (practiceId && !isDescriptionTab && practiceId && !isSubmissionTab) {
      router.push(`/practice/${practiceId}?tab=description`);
    }
  }, [practiceId]);
  if (authLoading) {
    return <Loader />;
  }
  if (!authenticatedUser) {
    router.replace("/user");
    return null;
  }
  if (!practiceProblem) {
    return <NotFound />;
  }

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
              defaultActiveKey={tab as string}
              items={tabItems}
              activeKey={tab as string}
              onTabClick={(tabKey) => {
                router.push(`/practice/${practiceId}?tab=${tabKey}`);
              }}
            />
            {tab === "description" && (
              <ProblemSection
                category={practiceProblem.category.category}
                companiesAskedIn={["Amazon"]}
                description={practiceProblem.problemDescription}
                difficulty={practiceProblem.difficulty}
                expectations={practiceProblem.expectations}
              />
            )}
            {tab === "submissions" && (
              <SubmissionsTable problemId={practiceId as string} />
            )}
          </div>
          {tab !== "submissions" && (
            <div className={styles.solutionSection}>
              <AnswerContainer
                problem={practiceProblem}
                onSuccessfulSubmit={() => {
                  router.push(`/practice/${practiceId}?tab=submissions`);
                }}
              />
            </div>
          )}
        </div>
      </PageWrapper>
    </div>
  );
};
export default PracticeDetails;
