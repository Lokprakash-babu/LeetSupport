import PageHead from "@/components/PageHead/PageHead";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import ProblemSection from "@/components/ProblemSection/ProblemSection";
import { useRouter } from "next/router";
import styles from "@styles/[practiceId].module.css";
import ChatSection from "@/components/AnswerSection/ChatSection/ChatSection";
const problem = {
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
};
const PracticeDetails = () => {
  const router = useRouter();
  const { practiceId } = router.query;

  return (
    <div>
      <PageHead pageName={problem.title} />
      <PageWrapper>
        <div className={styles.container}>
          <div className={styles.problemSection}>
            <ProblemSection
              category={problem.category.category}
              companiesAskedIn={["Amazon"]}
              description={problem.problemDescription}
              difficulty="Easy"
              expectations={problem.expectations}
            />
          </div>
          <div className={styles.solutionSection}>
            <ChatSection />
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default PracticeDetails;