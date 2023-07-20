export const problems = {
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
