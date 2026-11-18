export const prompts = [
  {
    question: "Tell me about a time you integrated multiple parts of an engineering system.",
    keywords: ["interface", "test", "result"],
    followUp: "Which interface caused the most rework, and how did you verify the fix?",
  },
  {
    question: "How would you validate an obstacle-avoidance behavior before a real test?",
    keywords: ["simulation", "scenario", "metric"],
    followUp: "What result would make you postpone a physical test?",
  },
  {
    question: "What trade-off would you consider when selecting a sensor for indoor navigation?",
    keywords: ["range", "accuracy", "latency"],
    followUp: "How would your choice change in a dim corridor?",
  },
  {
    question: "Describe a debugging process when simulation behavior differs from expectations.",
    keywords: ["reproduce", "logs", "hypothesis"],
    followUp: "How would you test your first hypothesis in isolation?",
  },
];
