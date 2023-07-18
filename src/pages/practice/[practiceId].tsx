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
import { listSubmissionBasedOnUser } from "@/utils/gqlApi";

const problem = {
  "chat-specialist-and-pizza": {
    key: "1",
    title: "Chat Specialist and Pizza!",
    id: "chat-specialist-and-pizza",
    category: {
      text: "chat",
      category: "chat",
    },
    difficulty: "Easy",
    problemDescription:
      "How can customer support effectively address Joey's complaint regarding a spoiled pizza and provide a satisfactory resolution, including a refund, while maintaining a positive customer experience and restoring trust in the brand?",
    expectations: [
      "Active listening: The customer support agent should listen attentively to Joey's concerns, allowing him to express his frustration and ensuring he feels heard and understood.",
      "Empathy and understanding: The agent should demonstrate empathy towards Joey's situation, acknowledging his disappointment and anger caused by receiving a spoiled pizza.",
      "Apology and taking responsibility: The agent should offer a sincere apology on behalf of the company, taking responsibility for the issue and assuring Joey that his complaint is being taken seriously.",
      "Timely response and resolution: The agent should aim to resolve the issue promptly, providing timely updates to Joey and keeping him informed of the progress made towards finding a solution.",
      "Solution-oriented approach: The agent should actively work towards finding a satisfactory resolution, including offering a refund or a replacement pizza, as per Joey's preference.",
      "Effective communication: The agent should communicate clearly and professionally, ensuring that Joey understands the proposed solution, any necessary steps he needs to take, and the expected timeline for resolution.",
    ],
    context:
      "You are an angry customer who didn't get proper pizza delivered. You are in conversation with support agent of that particular company, you have to keep your messages short and concise not exceeding 70 words",
    initialSupportMessage: "Hello! I am Joey! How can I help you.",
    customerInfo: {
      name: "Honest customer",
    },
  },
  "support-person-and-tech-problems": {
    key: "1",
    title: "Support Person and Tech Problems",
    id: "support-person-and-tech-problems",
    category: {
      text: "email",
      category: "email",
    },
    difficulty: "Medium",
    problemDescription:
      "I am extremely frustrated and facing a major obstacle for my business! I signed up on your portal, received the activation email, and even set my password. But guess what? I still can't log in! This is causing significant disruption and hindering my progress. The login email I used is hello@login.com. I need urgent assistance to resolve this issue and regain access to my account.",
    expectations: [
      "As a customer support agent, reply to the customer in an email describing the issue and the solution.",
      "Keep the mail short and concise.",
      "Number of character should be within 250 - 500 characters, inclusively",
    ],
    context: "",
    initialSupportMessage: "",
    customerInfo: {
      name: "",
    },
  },
};

export interface ISubmissionHandler {
  chat?: string;
  email?: {
    formattedContent: string;
    unFormattedContent: string;
  };
}
const AnswerContainer = (props: {
  problem: any;
  setSubmissionId: (id: string) => void;
}) => {
  const { problem } = props;
  const problemType = problem.category.category;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authenticatedUser } = useAuth();
  const [error, setError] = useState("");
  const onSubmitHandler = async (value: ISubmissionHandler) => {
    setIsSubmitting(true);
    console.log("on Submit handler", {
      value,
    });
    try {
      if (problemType === "email") {
        const response = await emailSubmissionHandler({
          formattedEmail: value.email?.formattedContent || "",
          nonFormattedEmail: value.email?.unFormattedContent || "",
          problemId: problem.id,
          userEmail: authenticatedUser?.attributes?.email,
        });
        //@ts-ignore
        const submissionId = response?.data?.createSUBMISSION?.id;
        props.setSubmissionId(submissionId);
      }
      setIsSubmitting(false);
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
  const practiceProblem = problem[practiceId];
  const { collapseSidebar } = useSidebarContext();
  const [activeKey, setActiveKey] = useState("description");
  const [submissionId, setSubmissionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);
  const [submissionList, setSubmissionList] = useState({});
  const { authenticatedUser, authLoading } = useAuth();
  const getAllSubmissions = async () => {
    setIsLoading(true);
    try {
      const response = await listSubmissionBasedOnUser({
        user: {
          eq: authenticatedUser?.attributes?.email,
        },
        problemId: {
          eq: practiceId as string,
        },
      });
      console.log("list submission response", response);
      //@ts-ignore
      setSubmissionList(response?.data?.listSUBMISSION?.items);
      setIsLoading(false);
    } catch (err: any) {
      setIsError(err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    collapseSidebar?.();
    getAllSubmissions();
  }, []);

  useEffect(() => {
    if (submissionId) {
      setActiveKey("submissions");
    }
  }, [submissionId]);

  if (authLoading || isLoading) {
    return <p>Loading...</p>;
  }
  if (!practiceProblem) {
    return <NotFound />;
  }
  if (error) {
    return <Error />;
  }
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
      children: <SubmissionSummary submissionId={submissionId} />,
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
          <div className={styles.solutionSection}>
            <AnswerContainer
              problem={practiceProblem}
              setSubmissionId={setSubmissionId}
            />
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default PracticeDetails;
