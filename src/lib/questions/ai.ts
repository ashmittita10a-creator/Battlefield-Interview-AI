import { QuestionPool } from "./types";

export const aiQuestions: QuestionPool = {
  Easy: [
    "Explain the fundamental difference between supervised, unsupervised, and reinforcement learning.",
    "A stakeholder asks why the AI model sometimes invents facts. How do you explain 'hallucination' to a non-technical person?",
    "Describe the concept of tokenization in Natural Language Processing. Why is it necessary for LLMs?",
    "What is the difference between an epoch and a batch in machine learning training?",
    "You are asked to build a simple classification model. Outline the steps from data collection to deployment.",
    "What are the common metrics used to evaluate a classification model (e.g., Precision, Recall, F1-Score), and when would you prioritize one over the other?",
    "Explain the concept of overfitting. What are some common techniques to prevent it?",
    "Describe what embeddings are and why they are essential for modern semantic search applications.",
    "What is a prompt injection attack, and what basic steps can you take to mitigate it in a production application?"
  ],
  Medium: [
    "Explain the mechanism of self-attention in Transformer architectures and why it was a breakthrough over RNNs/LSTMs.",
    "You need to build a system that answers questions based on internal company documents. Describe the architecture of a Retrieval-Augmented Generation (RAG) pipeline.",
    "Your RAG system is retrieving irrelevant context. What strategies would you use to improve the retrieval accuracy (e.g., hybrid search, reranking)?",
    "Describe the differences between fine-tuning a model and using few-shot prompt engineering. When would you choose one over the other?",
    "How do you evaluate the output quality of a generative language model when there is no single 'correct' answer?",
    "Explain the concept of a Vector Database. How does it perform similarity searches so quickly?",
    "You are training a custom model and notice the loss curve is oscillating wildly. What hyperparameters would you adjust to stabilize training?",
    "Discuss the differences between encoder-only (e.g., BERT) and decoder-only (e.g., GPT) architectures. What tasks are each best suited for?",
    "Your production LLM is responding too slowly. What are some techniques to optimize inference latency and throughput?"
  ],
  Hard: [
    "Describe the mathematical intuition and practical implementation of Low-Rank Adaptation (LoRA) for fine-tuning Large Language Models.",
    "Design a multi-agent system utilizing LLMs to automate a complex software engineering workflow. How do you handle inter-agent communication and error recovery?",
    "Explain the mechanics of Reinforcement Learning from Human Feedback (RLHF). What are the challenges in aligning an LLM with human preferences?",
    "You need to deploy a 70B parameter model, but it doesn't fit on a single GPU. Explain the differences between Tensor Parallelism and Pipeline Parallelism.",
    "Your Retrieval-Augmented Generation (RAG) pipeline suffers from 'lost in the middle' syndrome with long contexts. How would you architect a solution to fix this?",
    "Explain the concept of KV-Cache in transformer inference. How do techniques like PagedAttention optimize memory usage for high-throughput serving?",
    "Discuss the architectural tradeoffs between dense models and Mixture of Experts (MoE) models. Why are modern LLMs moving towards MoE?",
    "You are tasked with training an LLM from scratch on a massive proprietary corpus. Walk me through your data pipeline, including deduplication, tokenization, and quality filtering.",
    "How would you design a system to automatically detect and redact Personally Identifiable Information (PII) before it is passed in a prompt to a third-party LLM API?"
  ]
};
