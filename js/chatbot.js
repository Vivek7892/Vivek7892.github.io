const pageData = {
  name: "Vivek V",
  role: "Full Stack Developer & AI Engineer",
  education: "B.E. in Computer Science (Data Science), CGPA: 8.37",
  skills: ["Python","React.js", "Node.js", "MongoDB", "LangChain", "Flutter", "AWS", "Machine Learning"],
  projects: [
    "AI-Powered Student Assistant Chatbot - RAG-based chatbot using LangChain",
    "DDoS Attack Detection System - ML-based network security",
    "AI-Powered Document Verification System",
    "Real-Time Weather Mobile Application - Flutter app"
  ],
  contact: {
    phone:"7892409872",
    email: "vivekvvivekv70@gmail.com",
    linkedin: "linkedin.com/in/vivek-v-a0a41225a",
    github: "github.com/Vivek7892"
  }
};

function analyzeQuery(query) {
  const q = query.toLowerCase();
  
  if (q.includes('name') || q.includes('who')) {
    return `I'm ${pageData.name}, a ${pageData.role}.`;
  }
  if (q.includes('skill') || q.includes('technology') || q.includes('tech stack')) {
    return `My skills include: ${pageData.skills.join(', ')}.`;
  }
  if (q.includes('project')) {
    return `Featured projects:\n${pageData.projects.map((p, i) => `${i + 1}. ${p}`).join('\n')}`;
  }
  if (q.includes('education') || q.includes('study') || q.includes('degree')) {
    return `Education: ${pageData.education}`;
  }
  if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
    return `Contact me:\nEmail: ${pageData.contact.email}\nLinkedIn: ${pageData.contact.linkedin}\nGitHub: ${pageData.contact.github}`;
  }
  if (q.includes('experience') || q.includes('work')) {
    return "I have experience in Mobile App Development, Data Engineering at IVIS Lab, and Python certification from Infosys Springboard.";
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `Hello! I'm ${pageData.name}. Ask me about my skills, projects, education, or how to contact me.`;
  }
  
  return "I can help you with information about skills, projects, education, experience, or contact details. What would you like to know?";
}

document.addEventListener('DOMContentLoaded', () => {
  const chatBtn = document.getElementById('chatBtn');
  const chatWidget = document.getElementById('chatWidget');
  const closeChat = document.getElementById('closeChat');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatMessages = document.getElementById('chatMessages');

  chatBtn.addEventListener('click', () => {
    chatWidget.classList.add('active');
    chatBtn.style.display = 'none';
  });

  closeChat.addEventListener('click', () => {
    chatWidget.classList.remove('active');
    chatBtn.style.display = 'flex';
  });

  function addMessage(text, isUser) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleSend() {
    const query = chatInput.value.trim();
    if (!query) return;
    
    addMessage(query, true);
    chatInput.value = '';
    
    setTimeout(() => {
      const response = analyzeQuery(query);
      addMessage(response, false);
    }, 500);
  }

  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  addMessage("Hi! I'm your portfolio assistant. Ask me anything about Vivek's skills, projects, or experience!", false);
});
