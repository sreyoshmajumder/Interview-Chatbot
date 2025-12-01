// TalentScout Hiring Assistant - State Management

// Interview stages
const STAGES = {
  GREETING: 'greeting',
  GATHERING: 'gathering',
  ASSESSMENT: 'assessment',
  CLOSING: 'closing'
};

// Fields to collect
const FIELDS = ['name', 'email', 'phone', 'experience', 'position', 'location', 'techstack'];

// Application state
let state = {
  stage: STAGES.GREETING,
  currentField: null,
  candidateProfile: {},
  conversationHistory: [],
  technicalQuestions: [],
  currentQuestionIndex: 0,
  messageCount: 0,
  isProcessing: false
};

// Tech stack questions database
const techQuestions = {
  python: {
    junior: [
      "What is the difference between a list and a tuple in Python?",
      "How do you handle exceptions in Python?",
      "What is PEP 8 and why is it important?"
    ],
    mid: [
      "Explain list comprehensions and their advantages",
      "What are decorators and how do they work?",
      "Describe Python's GIL (Global Interpreter Lock)"
    ],
    senior: [
      "How does memory management work in Python?",
      "Explain metaclasses and when you would use them",
      "How would you optimize a slow Python application?"
    ]
  },
  javascript: {
    junior: [
      "What is the difference between let, const, and var?",
      "How do you handle asynchronous operations in JavaScript?",
      "What is the DOM and how do you manipulate it?"
    ],
    mid: [
      "Explain closures and provide an example",
      "What is event delegation and why is it useful?",
      "How does the JavaScript event loop work?"
    ],
    senior: [
      "Explain prototypal inheritance in JavaScript",
      "How would you implement a custom Promise?",
      "Describe the differences between var, let, and const at runtime"
    ]
  },
  react: {
    junior: [
      "What is JSX and how does it work?",
      "What is the difference between state and props?",
      "What is React and why do developers use it?"
    ],
    mid: [
      "Explain React hooks and provide examples of commonly used hooks",
      "What is the virtual DOM and why is it important?",
      "How do you manage component state in React?"
    ],
    senior: [
      "How do you optimize React application performance?",
      "Explain the fiber architecture in React",
      "How would you implement a custom hook?"
    ]
  },
  java: {
    junior: [
      "What are the main principles of OOP?",
      "Explain the difference between abstract classes and interfaces",
      "What is exception handling in Java?"
    ],
    mid: [
      "How does garbage collection work in Java?",
      "Explain the difference between checked and unchecked exceptions",
      "What are design patterns and why are they important?"
    ],
    senior: [
      "Describe the Java memory model and thread safety",
      "How would you implement a thread-safe singleton?",
      "Explain how Java generics work and type erasure"
    ]
  },
  django: {
    junior: [
      "What is Django and what are its main features?",
      "Explain the MTV architecture in Django",
      "How do you create a model in Django?"
    ],
    mid: [
      "What is middleware in Django and how does it work?",
      "Explain Django's ORM and how to write efficient queries",
      "How do you handle authentication in Django?"
    ],
    senior: [
      "How would you optimize Django query performance?",
      "Explain Django signals and their use cases",
      "How does Django handle caching?"
    ]
  },
  sql: {
    junior: [
      "What is the difference between INNER JOIN and LEFT JOIN?",
      "How do you write a basic SELECT query?",
      "What are indexes and why are they important?"
    ],
    mid: [
      "Explain SQL transactions and ACID properties",
      "How do you write complex queries with subqueries?",
      "What is query optimization and how do you approach it?"
    ],
    senior: [
      "How would you design a database schema for scalability?",
      "Explain query execution plans and how to read them",
      "How do you handle database replication and sharding?"
    ]
  },
  aws: {
    junior: [
      "What is AWS and what are its main services?",
      "Explain the difference between EC2 and S3",
      "What is an RDS database and how does it work?"
    ],
    mid: [
      "How do you use Lambda functions in AWS?",
      "Explain AWS security groups and IAM roles",
      "How do you design a scalable architecture on AWS?"
    ],
    senior: [
      "How would you design disaster recovery on AWS?",
      "Explain AWS auto-scaling and load balancing",
      "How do you optimize AWS costs?"
    ]
  },
  docker: {
    junior: [
      "What is Docker and what problems does it solve?",
      "What is a Docker image and how does it differ from a container?",
      "How do you write a Dockerfile?"
    ],
    mid: [
      "Explain Docker volumes and networking",
      "What is Docker Compose and when would you use it?",
      "How do you optimize Docker images for production?"
    ],
    senior: [
      "How would you design a Docker-based microservices architecture?",
      "Explain container orchestration with Kubernetes",
      "How do you handle container security?"
    ]
  }
};

// Stage messages
const stageMessages = {
  greeting: "👋 Greeting & Introduction",
  gathering: "📝 Information Gathering",
  assessment: "🧠 Technical Assessment",
  closing: "✨ Closing & Summary"
};

// Utility Functions
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
}

function parseExperience(text) {
  const numbers = text.match(/\d+/);
  return numbers ? parseInt(numbers[0]) : null;
}

function parseTechStack(text) {
  const normalized = text.toLowerCase();
  const techs = [];
  
  const keywords = {
    'python': 'python',
    'javascript': 'javascript',
    'js': 'javascript',
    'react': 'react',
    'reactjs': 'react',
    'java': 'java',
    'django': 'django',
    'sql': 'sql',
    'mysql': 'sql',
    'postgresql': 'sql',
    'aws': 'aws',
    'docker': 'docker'
  };
  
  for (const [key, value] of Object.entries(keywords)) {
    if (normalized.includes(key)) {
      if (!techs.includes(value)) {
        techs.push(value);
      }
    }
  }
  
  return techs.length > 0 ? techs : ['python'];
}

function getExperienceLevel(years) {
  if (years < 2) return 'junior';
  if (years < 5) return 'mid';
  return 'senior';
}

function generateTechnicalQuestions(techStack, experienceYears) {
  const level = getExperienceLevel(experienceYears || 2);
  const questions = [];
  
  techStack.forEach(tech => {
    const techLower = tech.toLowerCase();
    if (techQuestions[techLower]) {
      const levelQuestions = techQuestions[techLower][level] || techQuestions[techLower].mid;
      const numQuestions = Math.min(2, levelQuestions.length);
      for (let i = 0; i < numQuestions; i++) {
        questions.push({
          tech: tech,
          question: levelQuestions[i],
          level: level
        });
      }
    }
  });
  
  return questions.slice(0, 5);
}

function detectExitIntent(message) {
  const exitKeywords = ['goodbye', 'bye', 'thanks', 'exit', 'quit', 'done', 'no more', "that's all", 'thank you'];
  const lowerMessage = message.toLowerCase().trim();
  return exitKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Message Display Functions
function addMessage(content, isUser = false) {
  const messagesContainer = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = isUser ? '👤' : '🤖';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.innerHTML = content.replace(/\n/g, '<br>');
  
  const time = document.createElement('div');
  time.className = 'message-time';
  time.textContent = getCurrentTime();
  
  contentDiv.appendChild(bubble);
  contentDiv.appendChild(time);
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Update message count
  state.messageCount++;
  document.getElementById('message-count').textContent = state.messageCount;
  
  // Store in history
  state.conversationHistory.push({
    content: content,
    isUser: isUser,
    timestamp: new Date().toISOString()
  });
}

function showTypingIndicator() {
  const messagesContainer = document.getElementById('chat-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message assistant';
  typingDiv.id = 'typing-indicator';
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = '🤖';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'typing-indicator';
  typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  
  bubble.appendChild(typingIndicator);
  contentDiv.appendChild(bubble);
  typingDiv.appendChild(avatar);
  typingDiv.appendChild(contentDiv);
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

function updateStageBadge() {
  const badge = document.getElementById('stage-badge');
  badge.textContent = stageMessages[state.stage];
}

function updateCollectedInfo() {
  const container = document.getElementById('info-container');
  const profile = state.candidateProfile;
  
  if (Object.keys(profile).length === 0) {
    container.innerHTML = '<p class="no-info">No information collected yet</p>';
    return;
  }
  
  let html = '';
  
  if (profile.name) {
    html += `<div class="info-item">✅ <strong>Name:</strong> ${profile.name}</div>`;
  }
  if (profile.email) {
    html += `<div class="info-item">✅ <strong>Email:</strong> ${profile.email}</div>`;
  }
  if (profile.phone) {
    html += `<div class="info-item">✅ <strong>Phone:</strong> ${profile.phone}</div>`;
  }
  if (profile.experience) {
    html += `<div class="info-item">✅ <strong>Experience:</strong> ${profile.experience} years</div>`;
  }
  if (profile.position) {
    html += `<div class="info-item">✅ <strong>Position:</strong> ${profile.position}</div>`;
  }
  if (profile.location) {
    html += `<div class="info-item">✅ <strong>Location:</strong> ${profile.location}</div>`;
  }
  if (profile.techstack) {
    html += `<div class="info-item">✅ <strong>Tech Stack:</strong> ${profile.techstack.join(', ')}</div>`;
  }
  
  container.innerHTML = html;
}

// Bot Response Logic
function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Check for exit intent in any stage
  if (detectExitIntent(lowerMessage) && state.stage !== STAGES.GREETING) {
    state.stage = STAGES.CLOSING;
    updateStageBadge();
    return getClosingMessage();
  }
  
  // Handle based on current stage
  switch (state.stage) {
    case STAGES.GREETING:
      return handleGreetingStage(lowerMessage);
    case STAGES.GATHERING:
      return handleGatheringStage(userMessage);
    case STAGES.ASSESSMENT:
      return handleAssessmentStage(userMessage);
    case STAGES.CLOSING:
      return handleClosingStage();
    default:
      return "I'm not sure how to respond. Could you please repeat that?";
  }
}

function handleGreetingStage(message) {
  if (message.includes('yes') || message.includes('ready') || message.includes('sure') || message.includes('ok')) {
    state.stage = STAGES.GATHERING;
    state.currentField = 'name';
    updateStageBadge();
    return "Great! Let's start with your full name. What should I call you?";
  }
  return "No problem! Whenever you're ready, just let me know and we can begin. Are you ready to start? 😊";
}

function handleGatheringStage(message) {
  const field = state.currentField;
  
  // Validate and store based on current field
  if (field === 'name') {
    if (message.length < 2) {
      return "Please provide your full name.";
    }
    state.candidateProfile.name = message;
    state.currentField = 'email';
    updateCollectedInfo();
    return `Thanks, ${message}! Now, could you please provide your email address? We'll use this to contact you about your application.`;
  }
  
  if (field === 'email') {
    if (!validateEmail(message)) {
      return "❌ That doesn't look like a valid email. Please try again (e.g., name@example.com)";
    }
    state.candidateProfile.email = message;
    state.currentField = 'phone';
    updateCollectedInfo();
    return "Perfect! What's your phone number? Please include your country code if you're outside the US.";
  }
  
  if (field === 'phone') {
    if (!validatePhone(message)) {
      return "❌ That doesn't look like a valid phone number. Please try again.";
    }
    state.candidateProfile.phone = message;
    state.currentField = 'experience';
    updateCollectedInfo();
    return "Thanks! How many years of professional experience do you have?";
  }
  
  if (field === 'experience') {
    const years = parseExperience(message);
    if (years === null || years < 0 || years > 50) {
      return "❌ Please enter a valid number for years of experience (e.g., 3, 5, 10).";
    }
    state.candidateProfile.experience = years;
    state.currentField = 'position';
    updateCollectedInfo();
    return "Great! What position(s) are you interested in? (e.g., Senior Developer, Tech Lead, etc.)";
  }
  
  if (field === 'position') {
    if (message.length < 3) {
      return "Please provide the position you're interested in.";
    }
    state.candidateProfile.position = message;
    state.currentField = 'location';
    updateCollectedInfo();
    return "Excellent! Where are you currently located?";
  }
  
  if (field === 'location') {
    if (message.length < 2) {
      return "Please provide your location.";
    }
    state.candidateProfile.location = message;
    state.currentField = 'techstack';
    updateCollectedInfo();
    return "Perfect! Now for the important part - could you list the technologies and programming languages you're proficient in? (e.g., Python, JavaScript, React, AWS, Docker)";
  }
  
  if (field === 'techstack') {
    const techStack = parseTechStack(message);
    state.candidateProfile.techstack = techStack;
    state.currentField = null;
    updateCollectedInfo();
    
    // Generate technical questions
    state.technicalQuestions = generateTechnicalQuestions(techStack, state.candidateProfile.experience);
    state.currentQuestionIndex = 0;
    state.stage = STAGES.ASSESSMENT;
    updateStageBadge();
    
    return `Excellent! I see you're proficient in ${techStack.join(', ')}. \n\nNow let's assess your technical skills. Based on your tech stack and ${state.candidateProfile.experience} years of experience, I'll ask you ${state.technicalQuestions.length} technical questions. There's no time limit, and you can explain your answers in detail.\n\nLet's begin! 🚀\n\n**Question 1 of ${state.technicalQuestions.length}:**\n${state.technicalQuestions[0].question}`;
  }
  
  return "I didn't quite catch that. Could you please repeat?";
}

function handleAssessmentStage(message) {
  if (message.length < 10) {
    return "Please provide a more detailed answer. Take your time to explain your understanding.";
  }
  
  // Store the answer
  state.technicalQuestions[state.currentQuestionIndex].answer = message;
  state.currentQuestionIndex++;
  
  // Check if there are more questions
  if (state.currentQuestionIndex < state.technicalQuestions.length) {
    const acknowledgments = ["Great answer!", "Thanks for that detailed response!", "Excellent explanation!", "I appreciate the detail!"];
    const ack = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
    return `${ack}\n\n**Question ${state.currentQuestionIndex + 1} of ${state.technicalQuestions.length}:**\n${state.technicalQuestions[state.currentQuestionIndex].question}`;
  }
  
  // All questions answered, move to closing
  state.stage = STAGES.CLOSING;
  updateStageBadge();
  return getClosingMessage();
}

function getClosingMessage() {
  const profile = state.candidateProfile;
  return `Thank you for taking the time to complete this interview! 🌟\n\n📋 **Interview Summary**\n\n✅ Name: ${profile.name || 'N/A'}\n✅ Email: ${profile.email || 'N/A'}\n✅ Phone: ${profile.phone || 'N/A'}\n✅ Experience: ${profile.experience ? profile.experience + ' years' : 'N/A'}\n✅ Position: ${profile.position || 'N/A'}\n✅ Location: ${profile.location || 'N/A'}\n✅ Tech Stack: ${profile.techstack ? profile.techstack.join(', ') : 'N/A'}\n✅ Questions Answered: ${state.currentQuestionIndex}\n\nI'll review your responses and you should expect to hear from our team within 2-3 business days.\n\nIf you have any questions, feel free to reach out. Best of luck with your application! 💼`;
}

function handleClosingStage() {
  return "The interview has been completed. Thank you again for your time! If you'd like to start over, please click the 'Restart Interview' button. 😊";
}

// Event Handlers
function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  
  if (!message || state.isProcessing) {
    return;
  }
  
  // Clear input
  input.value = '';
  
  // Add user message
  addMessage(message, true);
  
  // Show typing indicator
  state.isProcessing = true;
  showTypingIndicator();
  
  // Simulate processing delay
  setTimeout(() => {
    removeTypingIndicator();
    const response = getBotResponse(message);
    addMessage(response, false);
    state.isProcessing = false;
    input.focus();
  }, 1000 + Math.random() * 1000);
}

function clearInterview() {
  if (confirm('Are you sure you want to restart the interview? All progress will be lost.')) {
    // Reset state
    state = {
      stage: STAGES.GREETING,
      currentField: null,
      candidateProfile: {},
      conversationHistory: [],
      technicalQuestions: [],
      currentQuestionIndex: 0,
      messageCount: 0,
      isProcessing: false
    };
    
    // Clear UI
    document.getElementById('chat-messages').innerHTML = '';
    document.getElementById('message-count').textContent = '0';
    updateStageBadge();
    updateCollectedInfo();
    
    // Start new interview
    initializeChat();
  }
}

// Initialize
function initializeChat() {
  const welcomeMessage = `👋 Welcome! I'm TalentScout, your AI-powered recruiting assistant. I'm here to conduct an initial screening interview for technology positions. This should take about 10-15 minutes.\n\nDuring our conversation, I'll:\n1. Gather your background information\n2. Ask about your technical skills\n3. Assess your proficiency with technical questions\n\nLet's get started! Are you ready to begin? 😊`;
  
  setTimeout(() => {
    addMessage(welcomeMessage, false);
  }, 500);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  
  // Enter key to send
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // Send button click
  sendBtn.addEventListener('click', sendMessage);
  
  // Initialize chat
  initializeChat();
});