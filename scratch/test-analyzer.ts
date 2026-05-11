import { analyzeInterviewLocally } from "../src/lib/resultAnalyzer";

const transcript = [
  {
    question: "Explain React hooks.",
    answer: "React hooks are functions that let you use state and other React features in functional components. For example, useState and useEffect."
  },
  {
    question: "What is CSS specificity?",
    answer: "It is how the browser decides which CSS property values are most relevant to an element. It is based on types of selectors."
  }
];

const result = analyzeInterviewLocally(transcript, "Frontend Developer", "Medium");
console.log("Evaluation Result:", JSON.stringify(result, null, 2));
