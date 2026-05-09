import { QuestionPool } from "./types";

export const backendQuestions: QuestionPool = {
  Easy: [
    "Explain how you would structure the directory layout for a scalable Node.js/Express application.",
    "A database query that used to take 10ms is now taking 2 seconds. What are your first steps to diagnose and resolve this?",
    "Describe the differences between authentication and authorization, and how you typically implement them in a REST API.",
    "Your application needs to communicate with a third-party API that frequently rate-limits you. How do you handle this gracefully?",
    "Explain the concept of database transactions. Why are they important in an e-commerce checkout flow?",
    "You notice intermittent 502 Bad Gateway errors in production. How do you begin troubleshooting this issue?",
    "What are the pros and cons of using an ORM versus writing raw SQL queries?",
    "Explain the difference between short polling, long polling, and WebSockets.",
    "How do you securely store user passwords in a database? Explain the concepts of hashing and salting."
  ],
  Medium: [
    "We need to implement a search feature across millions of user records. Why might a standard PostgreSQL ILIKE query not be sufficient, and what alternatives would you consider?",
    "Explain the concept of a Message Broker (like RabbitMQ or Kafka). Describe a real-world scenario where introducing one is necessary.",
    "Your service is experiencing memory leaks leading to Out of Memory (OOM) crashes. Walk me through your debugging process using Node.js profiling tools.",
    "Describe how you would design a robust rate-limiting middleware for an API to prevent abuse from malicious actors.",
    "We are transitioning a monolith to microservices. What are the key challenges regarding data consistency, and how do you handle distributed transactions?",
    "A critical API endpoint must be highly available but relies on a slow legacy system. How do you implement the Circuit Breaker pattern to protect your service?",
    "Explain the differences between horizontal and vertical scaling. When is horizontal scaling NOT the right answer?",
    "How do you manage schema migrations in a CI/CD pipeline without causing downtime?",
    "Describe your approach to designing a caching strategy using Redis for an API that serves both static and highly dynamic user-specific data."
  ],
  Hard: [
    "Design the backend architecture for a real-time chat application like Slack, focusing on how to handle 1 million concurrent WebSocket connections efficiently.",
    "Explain the CAP theorem in detail. If you are building a banking ledger system, which two guarantees do you prioritize and what database technology would you choose?",
    "Our platform is experiencing massive sudden traffic spikes (thundering herd problem). How do you architect your caching layer and services to survive this without cascading failures?",
    "You need to implement database sharding for a rapidly growing multi-tenant SaaS application. What sharding key would you choose, and how do you handle cross-shard queries?",
    "Describe the implementation details of the Saga Pattern for distributed transactions. Contrast choreography vs orchestration approaches.",
    "A background worker processing video uploads occasionally hangs and stalls the entire queue. How do you build a resilient job processing system to prevent and recover from poison pills?",
    "Design a geo-distributed backend architecture to ensure low latency for users globally while complying with data sovereignty laws (e.g., GDPR).",
    "Explain how you would implement leader election in a distributed cluster of worker nodes to ensure only one node executes a specific cron job.",
    "Walk me through designing an idempotent API for processing payments to ensure a user is never charged twice, even during network timeouts or retries."
  ]
};
