import { QuestionPool } from "./types";

export const frontendQuestions: QuestionPool = {
  Easy: [
    "A junior developer pushed code that causes a React component to re-render infinitely. What are the common causes for this, and how would you debug it?",
    "We are migrating an old vanilla JS project to React. Explain how you would convert a complex DOM manipulation script into a declarative React component.",
    "Your team wants to implement a dark mode feature. Describe the CSS and JavaScript architecture you would use to make this maintainable.",
    "You notice a page is loading very slowly on mobile networks. What initial frontend debugging steps would you take in Chrome DevTools to identify the bottleneck?",
    "A user reports that clicking a specific button occasionally registers twice. How would you prevent multiple rapid submissions on the frontend?",
    "Explain the concept of semantic HTML to a stakeholder who wants to use `<div>` tags for everything, focusing on accessibility and SEO benefits.",
    "You need to center a dynamic modal on the screen regardless of viewport size. How would you achieve this using modern CSS?",
    "Your team is debating whether to use CSS Modules or Tailwind CSS for a new project. Outline the pros and cons of each approach based on your experience.",
    "A bug report says the UI breaks when a user enters a very long string without spaces. How do you handle long text wrapping in CSS?"
  ],
  Medium: [
    "We are experiencing performance issues with a large data grid component in React. Describe your approach to virtualizing the list and managing state to improve FPS.",
    "You need to implement a complex multi-step form with validation at each step. How would you architect the state management to avoid excessive re-renders and keep the code clean?",
    "Explain the tradeoffs between Server-Side Rendering (SSR), Static Site Generation (SSG), and Client-Side Rendering (CSR) when building an e-commerce storefront.",
    "A memory leak is crashing the browser tab after the user interacts with your SPA for 30 minutes. Walk me through your step-by-step process for finding and fixing the leak.",
    "We have a requirement to support offline capabilities and push notifications. How would you integrate a Service Worker, and what caching strategies would you employ?",
    "Your application relies heavily on third-party scripts (analytics, ads, chat widgets) which are hurting your Core Web Vitals. How do you optimize the loading of these scripts?",
    "Describe how you would implement a secure authentication flow using JWTs on the frontend, including token storage, refresh token handling, and XSS prevention.",
    "We are building a real-time collaborative dashboard. Would you choose WebSockets or Server-Sent Events (SSE)? Explain your reasoning and how you'd handle disconnects.",
    "A new feature requires fetching data from multiple dependent API endpoints sequentially. How do you handle this cleanly without blocking the UI?"
  ],
  Hard: [
    "Our enterprise application has over 100 developers contributing to the frontend. Describe how you would design and implement a micro-frontends architecture to enable independent deployments.",
    "You are tasked with building a custom state management library from scratch. Explain the core principles, reactivity model, and API design of your custom solution.",
    "A critical production bug only happens for users on Safari in iOS 14. You cannot reproduce it locally. Outline your strategy for debugging and capturing the necessary context to fix it.",
    "Explain the mechanics of the browser rendering pipeline (Parse, Style, Layout, Paint, Composite). How do you optimize CSS animations to run exclusively on the GPU compositor thread?",
    "We need to implement a rich text editor similar to Notion with collaborative editing. Outline the frontend architecture and data structures required to support this.",
    "Your Next.js application's build time has ballooned to 20 minutes, and the bundle size is massive. Walk me through a comprehensive strategy to audit, split, and optimize the bundle.",
    "How would you architect a robust, type-safe design system package that is consumed by multiple React applications, ensuring tree-shaking and seamless updates?",
    "A streaming video feature is causing jank and dropped frames on lower-end devices. How do you utilize Web Workers and OffscreenCanvas to solve this?",
    "Explain the implementation details of React Server Components (RSC). How does the serialization boundary work, and what are the security implications?"
  ]
};
