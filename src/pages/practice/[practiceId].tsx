import PageHead from "@/components/PageHead/PageHead";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import ProblemSection from "@/components/ProblemSection/ProblemSection";
import { useRouter } from "next/router";
import styles from "@styles/[practiceId].module.css";
import ChatSection from "@/components/AnswerSection/ChatSection/ChatSection";
import NotFound from "@/components/NotFound/NotFound";
import EmailSection from "@/components/AnswerSection/EmailSection/EmailSection";
import { useAuth } from "@/components/Auth";
const problem = {
  "chat-specialist-and-pizza": {
    key: "1",
    title: "Chat Specialist and Pizza!",
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

const AnswerContainer = (props: { problem: any }) => {
  const { problem } = props;
  const problemType = problem.category.category;
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
      return <EmailSection />;
    default:
      return <></>;
  }
};
const PracticeDetails = () => {
  const router = useRouter();
  const { practiceId = "" } = router.query;
  //@ts-ignore
  const practiceProblem = problem[practiceId];
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
            <ProblemSection
              category={practiceProblem.category.category}
              companiesAskedIn={["Amazon"]}
              description={practiceProblem.problemDescription}
              difficulty={practiceProblem.difficulty}
              expectations={practiceProblem.expectations}
            />
          </div>
          <div className={styles.solutionSection}>
            <AnswerContainer problem={practiceProblem} />
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default PracticeDetails;
