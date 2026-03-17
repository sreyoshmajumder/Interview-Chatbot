# 🤖 Interview Chatbot — AI-Powered Interview Preparation Assistant

### *Your personal LLM-powered coach that tailors mock interviews to YOUR interests, skills, and target role*

---

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Frontend-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Styled-1572B6?style=flat-square&logo=css3&logoColor=white)
![LLM](https://img.shields.io/badge/LLM-Powered-412991?style=flat-square&logo=openai&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat-square&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![Languages](https://img.shields.io/badge/CSS-60.8%25_|_JS-34.3%25_|_HTML-4.9%25-blueviolet?style=flat-square)

---

> **Interview Chatbot** is a fully browser-based, LLM-powered interview preparation tool that conducts **personalized mock interviews** based on a candidate's interests, target role, and skill level. It asks intelligent follow-up questions, evaluates answers in real time, and coaches the user toward interview-readiness — all through a sleek, responsive chat interface.

---

## 📌 Table of Contents

- [✨ Features](#-features)
- [🏗️ System Architecture](#-system-architecture)
- [🔄 Conversation Flow](#-conversation-flow)
- [🧠 LLM Integration Design](#-llm-integration-design)
- [🎨 Frontend Architecture](#-frontend-architecture)
- [📐 Component Design](#-component-design)
- [🗂️ File Structure](#-file-structure)
- [⚙️ How It Works](#-how-it-works)
- [🛠️ Installation & Setup](#-installation--setup)
- [▶️ How to Run](#-how-to-run)
- [🔑 Key Code Walkthrough](#-key-code-walkthrough)
- [🚀 Extending the Bot](#-extending-the-bot)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

| Feature | Description |
|:---|:---|
| 🎯 **Interest-Based Personalization** | Tailors every question to the candidate's declared interests and target domain |
| 🧠 **LLM-Powered Q&A** | Uses a large language model to generate contextually relevant interview questions |
| 💬 **Real-Time Chat Interface** | Smooth, messenger-style conversation UI built in vanilla JS + CSS |
| 🔄 **Dynamic Follow-Ups** | Asks intelligent follow-up questions based on the candidate's previous answers |
| 📊 **Answer Evaluation** | LLM evaluates responses and provides feedback, hints, and model answers |
| 📚 **Multi-Domain Support** | Covers technical, behavioral, HR, and domain-specific interview tracks |
| 🎨 **Premium Responsive UI** | Fully responsive CSS-styled chat interface — works on desktop and mobile |
| 📄 **Implementation Guide** | Bundled PDF guide for setup, configuration, and customization |
| ⚡ **Zero Backend Required** | Runs entirely in the browser via direct LLM API calls from `app.js` |

---

## 🏗️ System Architecture

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                  INTERVIEW CHATBOT — SYSTEM ARCHITECTURE                    ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   ┌──────────────────────────────────────────────────────────────────────┐  ║
║   │                      PRESENTATION LAYER                              │  ║
║   │                                                                      │  ║
║   │   ┌────────────────┐   ┌────────────────┐   ┌──────────────────┐   │  ║
║   │   │   index.html   │   │   style.css    │   │     app.js       │   │  ║
║   │   │                │   │                │   │                  │   │  ║
║   │   │  Chat shell    │   │  Chat bubbles  │   │  Event handlers  │   │  ║
║   │   │  Input form    │   │  Animations    │   │  State manager   │   │  ║
║   │   │  Message feed  │   │  Responsive    │   │  DOM updater     │   │  ║
║   │   │  Typing dots   │   │  layout        │   │  API caller      │   │  ║
║   │   └────────┬───────┘   └────────────────┘   └────────┬─────────┘   │  ║
║   └────────────┼──────────────────────────────────────────┼─────────────┘  ║
║                │                                           │                ║
║                ▼                                           ▼                ║
║   ┌──────────────────────────────────────────────────────────────────────┐  ║
║   │                    APPLICATION LOGIC LAYER                           │  ║
║   │                                                                      │  ║
║   │   ┌──────────────────┐   ┌─────────────────┐   ┌─────────────────┐  │  ║
║   │   │  Session Manager │   │ Prompt Engineer │   │  Conversation   │  │  ║
║   │   │                  │   │                 │   │  History Stack  │  │  ║
║   │   │  • User profile  │   │  • System role  │   │                 │  │  ║
║   │   │  • Interests     │   │  • Few-shot eg. │   │  • msg[]        │  │  ║
║   │   │  • Domain        │   │  • Context      │   │  • role/content │  │  ║
║   │   │  • Round number  │   │    injection    │   │  • sliding win. │  │  ║
║   │   └────────┬─────────┘   └────────┬────────┘   └────────┬────────┘  │  ║
║   └────────────┼────────────────────── ┼─────────────────────┼───────────┘  ║
║                └───────────────────────┼─────────────────────┘             ║
║                                        ▼                                    ║
║   ┌──────────────────────────────────────────────────────────────────────┐  ║
║   │                       LLM API LAYER                                  │  ║
║   │                                                                      │  ║
║   │   ┌──────────────────────────────────────────────────────────────┐  │  ║
║   │   │   fetch() → LLM Endpoint (OpenAI / Gemini / Groq / Ollama)   │  │  ║
║   │   │                                                              │  │  ║
║   │   │   POST /v1/chat/completions                                  │  │  ║
║   │   │   { model, messages[], temperature, max_tokens }             │  │  ║
║   │   │                      ▼                                       │  │  ║
║   │   │   Response → question / feedback / model_answer              │  │  ║
║   │   └──────────────────────────────────────────────────────────────┘  │  ║
║   └──────────────────────────────────────────────────────────────────────┘  ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 🔄 Conversation Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      INTERVIEW SESSION FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

  USER OPENS APP
        │
        ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │  STEP 1 — ONBOARDING INTAKE                                             │
  │                                                                         │
  │  Bot: "Hi! I'm your Interview Coach. Let's get started."               │
  │  Bot: "What role are you preparing for?"                                │
  │  User: "Data Scientist at a fintech company"                            │
  │                                                                         │
  │  Bot: "What are your key areas of interest / strongest skills?"        │
  │  User: "Machine learning, Python, SQL, financial modelling"             │
  │                                                                         │
  │  Bot: "What level are you targeting? (Junior / Mid / Senior)"          │
  │  User: "Mid-level"                                                       │
  └─────────────────────────────────────────────────────────────────────────┘
        │
        │  Profile built → injected into system prompt
        ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │  STEP 2 — PERSONALIZED QUESTION GENERATION                              │
  │                                                                         │
  │  LLM generates tailored question based on:                             │
  │  • Target role                                                          │
  │  • Declared interests                                                   │
  │  • Seniority level                                                      │
  │  • Question category (Technical / Behavioural / HR / Case)             │
  │  • Round number (warm-up → harder → situational → wrap-up)             │
  │                                                                         │
  │  Bot: "Can you explain the bias-variance tradeoff and describe a       │
  │        real scenario where you had to manage it in production?"         │
  └─────────────────────────────────────────────────────────────────────────┘
        │
        │  User answers
        ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │  STEP 3 — ANSWER EVALUATION & COACHING                                  │
  │                                                                         │
  │  LLM evaluates response across dimensions:                             │
  │  ✅ Correctness    — Is the core concept right?                        │
  │  ✅ Completeness   — Did they cover key aspects?                       │
  │  ✅ Clarity        — Is the explanation well-structured?               │
  │  ✅ Depth          — Does it show mid-level expertise?                 │
  │                                                                         │
  │  Bot: "Good answer! You nailed the concept. For a mid-level role,      │
  │        mention regularization (L1/L2) as a practical fix.              │
  │        Model answer: [...]"                                             │
  └─────────────────────────────────────────────────────────────────────────┘
        │
        │  Repeat for N rounds
        ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │  STEP 4 — SESSION SUMMARY                                               │
  │                                                                         │
  │  Bot summarizes:                                                        │
  │  • Total questions asked                                                │
  │  • Strongest areas demonstrated                                         │
  │  • Topics to revise before the real interview                          │
  │  • Encouragement & next steps                                           │
  └─────────────────────────────────────────────────────────────────────────┘
        │
        ▼
  USER ENDS SESSION  ──► Option to restart with new role / interests
```

---

## 🧠 LLM Integration Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        LLM PROMPT ARCHITECTURE                              │
└─────────────────────────────────────────────────────────────────────────────┘

  Every API call to the LLM is structured as:

  ┌─────────────────────────────────────────────────────────────────────────┐
  │  messages: [                                                            │
  │                                                                         │
  │    { role: "system",    ← SYSTEM PROMPT (static + dynamic injection)   │
  │      content: `                                                         │
  │        You are an expert technical interview coach.                    │
  │        The candidate is preparing for: ${role}                         │
  │        Their interests are: ${interests}                               │
  │        Seniority level: ${level}                                       │
  │        Current round: ${roundNumber} of ${totalRounds}                 │
  │                                                                         │
  │        Rules:                                                           │
  │        - Ask one focused question per turn                             │
  │        - Evaluate the answer before asking the next                    │
  │        - Match difficulty to seniority level                           │
  │        - Provide model answers when evaluating                         │
  │        - Keep a warm, professional, encouraging tone                   │
  │      `                                                                  │
  │    },                                                                   │
  │                                                                         │
  │    { role: "assistant", content: "previous bot message" },  ←──┐      │
  │    { role: "user",      content: "previous user answer"  },  ←──┤      │
  │    { role: "assistant", content: "..."                    },  ←──┤      │
  │    { role: "user",      content: "..."                    },  ←──┘      │
  │                            ↑ Sliding conversation history window        │
  │                                                                         │
  │    { role: "user",      content: currentUserMessage }   ← LATEST       │
  │  ]                                                                      │
  └─────────────────────────────────────────────────────────────────────────┘

  PROMPT DESIGN PRINCIPLES:
  ─────────────────────────────────────────────────────────────────────────
  ① Role injection    →  Bot knows it's a coach, not a generic assistant
  ② Context binding   →  Every question grounded in declared interests
  ③ Level calibration →  Junior gets simpler questions than Senior
  ④ Round awareness   →  Early rounds warm up, later rounds challenge
  ⑤ History window    →  Last N turns sent for contextual follow-ups
  ⑥ Evaluation mode   →  Triggered after each user answer
```

---

## 🎨 Frontend Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      FRONTEND ARCHITECTURE (MVC-lite)                       │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────────┐
  │   MODEL (State)  │     │  VIEW (DOM)       │     │  CONTROLLER (app.js) │
  │   ─────────────  │     │  ─────────────    │     │  ────────────────    │
  │                  │     │                   │     │                      │
  │  userProfile {}  │◄────│  index.html       │────►│  handleSend()        │
  │  • role          │     │  • #chat-window   │     │  handleKeyPress()    │
  │  • interests     │     │  • #input-box     │     │  buildSystemPrompt() │
  │  • level         │     │  • #send-btn      │     │  callLLMApi()        │
  │                  │     │  • .user-bubble   │     │  appendMessage()     │
  │  conversation[]  │     │  • .bot-bubble    │     │  showTypingDots()    │
  │  • role          │     │  • .typing-dot    │     │  hideTypingDots()    │
  │  • content       │     │                   │     │  updateSession()     │
  │                  │     │  style.css        │     │  generateSummary()   │
  │  session {}      │     │  • Bubble styles  │     │                      │
  │  • roundNumber   │     │  • Animations     │     │                      │
  │  • phase         │     │  • Scroll snap    │     │                      │
  │  • isWaiting     │     │  • Mobile layout  │     │                      │
  └──────────────────┘     └──────────────────┘     └──────────────────────┘
```

---

## 📐 Component Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CHAT UI COMPONENT LAYOUT                              │
└─────────────────────────────────────────────────────────────────────────────┘

  ┌────────────────────────────────────────────────────────────────────────┐
  │  🤖  Interview Chatbot                            [ Round 3 / 10 ]     │
  │  ─────────────────────────────────────────────────────────────────     │
  │                                                                        │
  │   ┌─────────────────────────────────────────────────────────────────┐  │
  │   │                    #chat-window                                  │  │
  │   │                                                                  │  │
  │   │   ┌──────────────────────────────────┐                          │  │
  │   │   │ 🤖  .bot-bubble                  │   ← LLM question         │  │
  │   │   │ "Can you explain the bias-       │                          │  │
  │   │   │  variance tradeoff?"             │                          │  │
  │   │   └──────────────────────────────────┘                          │  │
  │   │                                                                  │  │
  │   │             ┌──────────────────────────────────┐                │  │
  │   │             │                  .user-bubble 👤 │  ← User answer │  │
  │   │             │ "Bias is error from wrong        │                │  │
  │   │             │  assumptions, variance is from   │                │  │
  │   │             │  sensitivity to training data."  │                │  │
  │   │             └──────────────────────────────────┘                │  │
  │   │                                                                  │  │
  │   │   ┌──────────────────────────────────┐                          │  │
  │   │   │ 🤖  .bot-bubble  .evaluating     │   ← Feedback             │  │
  │   │   │ "✅ Great! You nailed the core.  │                          │  │
  │   │   │  Also mention regularization..." │                          │  │
  │   │   └──────────────────────────────────┘                          │  │
  │   │                                                                  │  │
  │   │   ┌──────────────────────────────────┐                          │  │
  │   │   │ 🤖  ●  ●  ●   .typing-indicator  │   ← Typing animation     │  │
  │   │   └──────────────────────────────────┘                          │  │
  │   └─────────────────────────────────────────────────────────────────┘  │
  │                                                                        │
  │   ┌─────────────────────────────────────────────────────────────────┐  │
  │   │  #input-area                                                     │  │
  │   │  ┌──────────────────────────────────────────┐  ┌─────────────┐ │  │
  │   │  │  Type your answer here...                │  │   Send  ➤   │ │  │
  │   │  └──────────────────────────────────────────┘  └─────────────┘ │  │
  │   └─────────────────────────────────────────────────────────────────┘  │
  └────────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ File Structure

```
Interview-Chatbot/
│
├── 🌐 index.html                  ← App shell — chat UI structure
│   ├── #chat-window               │  Scrollable message feed
│   ├── #input-box                 │  Candidate answer textarea
│   ├── #send-btn                  │  Send trigger
│   └── <script src="app.js">      │  Wires up all interactivity
│
├── 🎨 style.css                   ← Full visual design (60.8% of codebase)
│   ├── Chat layout & grid         │  Flex/grid-based responsive layout
│   ├── .bot-bubble                │  LLM message styling (left-aligned)
│   ├── .user-bubble               │  User message styling (right-aligned)
│   ├── .typing-indicator          │  Animated three-dot typing effect
│   ├── .evaluation-block          │  Styled feedback/score blocks
│   └── Media queries              │  Mobile-first responsive breakpoints
│
├── ⚙️  app.js                     ← Core application logic (34.3% of codebase)
│   ├── CONFIG {}                  │  API key, model, endpoint, settings
│   ├── state {}                   │  Session state, conversation history
│   ├── buildSystemPrompt()        │  Injects user profile into LLM context
│   ├── callLLMApi()               │  fetch() wrapper for LLM endpoint
│   ├── handleSend()               │  Main event — processes user input
│   ├── appendMessage()            │  Renders message bubbles to DOM
│   ├── showTypingDots()           │  Shows animated waiting indicator
│   └── generateSummary()         │  Produces end-of-session report
│
├── 📄 requirements                ← Dependency list (Node packages / CDN refs)
│
├── 🔧 talent-scout-setup          ← Setup configuration / env scaffold
│
├── 📘 implementation-guide.pdf    ← Full setup, config & customization guide
│
└── 📖 README.md                   ← You are here!
```

---

## ⚙️ How It Works

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        UNDER THE HOOD                                        │
└─────────────────────────────────────────────────────────────────────────────┘

  1. PAGE LOAD
     index.html renders the chat shell
     app.js initialises state{} and fires the opening bot greeting

  2. USER ONBOARDING (Phase: 'intake')
     Bot asks 3 setup questions sequentially:
       Q1 → target role
       Q2 → interests / skills
       Q3 → seniority level
     Answers stored in userProfile{}
     Phase transitions to 'interview'

  3. QUESTION GENERATION (Phase: 'interview')
     buildSystemPrompt() constructs context-rich system message
     conversation[] history appended with new user message
     callLLMApi() sends full messages[] array to LLM endpoint
     Response streamed/received → appendMessage() renders bot bubble

  4. ANSWER EVALUATION
     After each user response, a secondary LLM call evaluates:
       • Is the answer correct?
       • What's missing?
       • Model answer for reference
     Evaluation rendered in styled .evaluation-block

  5. FOLLOW-UP QUESTION
     LLM asked to generate next question, now aware of:
       • All previous Q&A pairs in history
       • Gaps revealed by previous answer
       • Remaining rounds counter

  6. SESSION END
     After N rounds (configurable), generateSummary() called
     LLM produces final coaching report summarizing performance
     Option to restart with new profile

  STATEFULNESS:
  ─────────────────────────────────────────────────────────────────────────
  All conversation context is maintained client-side in conversation[]
  Each LLM call includes the full sliding window of prior messages
  No server, no database — purely stateful in-browser session
```

---

## 🛠️ Installation & Setup

**Prerequisites:** Node.js 16+ (optional, for local server) · A modern browser · LLM API key

### Step 1 — Clone the Repository

```bash
git clone https://github.com/sreyoshmajumder/Interview-Chatbot.git
cd Interview-Chatbot
```

### Step 2 — Configure Your LLM API Key

Open `app.js` and set your API credentials in the `CONFIG` block at the top:

```javascript
const CONFIG = {
  apiKey   : "YOUR_API_KEY_HERE",        // OpenAI / Groq / Gemini key
  endpoint : "https://api.openai.com/v1/chat/completions",
  model    : "gpt-4o-mini",              // or "llama3-8b-8192", "gemini-pro"
  maxTokens: 1024,
  temperature: 0.7,
  maxRounds: 10,                         // number of Q&A rounds per session
};
```

### Step 3A — Run Directly in Browser (Simplest)

```bash
# Just open index.html directly — no server needed
open index.html         # macOS
start index.html        # Windows
xdg-open index.html     # Linux
```

### Step 3B — Run with Local Server (Recommended)

```bash
# Using Node.js + npx
npx serve .
# → Open: http://localhost:3000

# Or using Python
python3 -m http.server 8080
# → Open: http://localhost:8080

# Or using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

### Supported LLM Providers

| Provider | Model Examples | Endpoint |
|:---|:---|:---|
| **OpenAI** | `gpt-4o`, `gpt-4o-mini`, `gpt-3.5-turbo` | `api.openai.com/v1/chat/completions` |
| **Groq** | `llama3-8b-8192`, `mixtral-8x7b` | `api.groq.com/openai/v1/chat/completions` |
| **Google Gemini** | `gemini-pro`, `gemini-1.5-flash` | `generativelanguage.googleapis.com` |
| **Ollama (local)** | `llama3`, `mistral`, `phi3` | `localhost:11434/api/chat` |

---

## ▶️ How to Run

```
Clone ──► Set API key in app.js ──► Open index.html ──► Start chatting!
  ↓               ↓                       ↓                    ↓
git clone    CONFIG.apiKey =         open in browser      Bot greets you,
the repo     "sk-..."                or npx serve .       asks your role,
                                                          begins interview!
```

---

## 🔑 Key Code Walkthrough

### Core State Object

```javascript
const state = {
  phase        : "intake",      // 'intake' | 'interview' | 'summary'
  roundNumber  : 0,             // current Q&A round
  isWaiting    : false,         // prevent double-send while LLM responds
  userProfile  : {
    role      : "",
    interests : "",
    level     : "",
  },
  conversation : [],            // full message history [{role, content}]
};
```

### Building the System Prompt

```javascript
function buildSystemPrompt() {
  return `
    You are an expert interview coach conducting a mock interview.

    Candidate profile:
    - Target role    : ${state.userProfile.role}
    - Interests      : ${state.userProfile.interests}
    - Seniority level: ${state.userProfile.level}
    - Current round  : ${state.roundNumber} of ${CONFIG.maxRounds}

    Instructions:
    1. Ask ONE focused interview question per turn, tailored to their interests.
    2. After the candidate answers, evaluate it (correctness, completeness,
       clarity) and provide a model answer.
    3. Adjust difficulty progressively — easier early, harder later.
    4. Keep tone warm, professional, and encouraging.
    5. On the final round, produce a full session summary with strengths
       and topics to revise.
  `.trim();
}
```

### Calling the LLM

```javascript
async function callLLMApi(userMessage) {
  state.conversation.push({ role: "user", content: userMessage });
  showTypingDots();

  try {
    const response = await fetch(CONFIG.endpoint, {
      method  : "POST",
      headers : {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model      : CONFIG.model,
        max_tokens : CONFIG.maxTokens,
        temperature: CONFIG.temperature,
        messages   : [
          { role: "system", content: buildSystemPrompt() },
          ...state.conversation,           // full sliding window history
        ],
      }),
    });

    const data    = await response.json();
    const botReply = data.choices[0].message.content;

    state.conversation.push({ role: "assistant", content: botReply });
    hideTypingDots();
    appendMessage("bot", botReply);
    state.roundNumber++;

  } catch (error) {
    hideTypingDots();
    appendMessage("bot", "⚠️ Error reaching the AI. Check your API key and try again.");
    console.error("LLM API error:", error);
  }
}
```

### Rendering Messages

```javascript
function appendMessage(sender, text) {
  const chatWindow = document.getElementById("chat-window");
  const bubble     = document.createElement("div");

  bubble.classList.add(sender === "bot" ? "bot-bubble" : "user-bubble");
  bubble.innerHTML = marked.parse(text);    // render markdown in replies

  chatWindow.appendChild(bubble);
  chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: "smooth" });
}
```

---

## 🚀 Extending the Bot

```
Want to take this further? Here are high-impact extensions:
─────────────────────────────────────────────────────────────────────────────

  🔧 ADD VOICE INPUT
     Use Web Speech API → navigator.mediaDevices / SpeechRecognition
     Let users answer questions verbally for realistic mock prep

  📊 ADD SCORING DASHBOARD
     Track scores per round, display radar chart of skill dimensions
     Libraries: Chart.js or D3.js

  🗄️ ADD PERSISTENCE
     Store session history in localStorage or IndexedDB
     Allow users to resume or review past sessions

  🔐 ADD BACKEND (Node.js / Express)
     Move API key server-side for security
     Add user auth, session storage, and history API

  📄 ADD RESUME PARSING
     Let user upload their CV (PDF) → extract skills automatically
     Use pdf.js for in-browser parsing → pre-fill interests

  🌐 ADD MULTI-LANGUAGE SUPPORT
     Add language selector → inject target language in system prompt
     Supports non-English interview prep

  🧪 ADD DIFFICULTY SELECTOR
     Let user choose: Easy / Medium / Hard
     Inject difficulty into CONFIG and system prompt
```

---

## 🤝 Contributing

All contributions welcome! To contribute:

```bash
# 1. Fork the repo on GitHub

# 2. Create a feature branch
git checkout -b feature/voice-input

# 3. Make your changes and commit
git commit -m "✨ Add Web Speech API voice input support"

# 4. Push and open a PR
git push origin feature/voice-input
```

Suggested areas to contribute:

- 🐛 Bug fixes and edge-case handling
- 🎨 UI/UX improvements and themes
- 🧠 Better system prompt engineering
- 📱 Progressive Web App (PWA) support
- 🌍 Internationalisation (i18n)

---

## 📚 References

- [OpenAI Chat Completions API](https://platform.openai.com/docs/api-reference/chat)
- [Groq Cloud — Fast LLM Inference](https://console.groq.com/)
- [Web Speech API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [marked.js — Markdown renderer](https://marked.js.org/)
- See `implementation-guide.pdf` in this repo for full setup walkthrough

---

## 📜 License

MIT License — free to use, modify, and distribute with attribution.

---

*"The best way to prepare for an interview is to have a thousand of them. Now you can — for free, on demand, personalized to you."*

**Built with 🧠 LLMs and ❤️ by [sreyoshmajumder](https://github.com/sreyoshmajumder)**
