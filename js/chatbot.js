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
    linkedin: "https://linkedin.com/in/vivek-v-a0a41225a",
    github: "https://github.com/Vivek7892"
  },
  links: {
    portfolio: "index.html",
    projects: "project.html",
    cv: "cv.html",
    resume: "resume/VIVEK V.pdf"
  }
};

function linkTag(href, label) {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function analyzeQuery(query) {
  const q = query.toLowerCase();
  
  if (q.includes('name') || q.includes('who')) {
    return { isHtml: false, message: `I'm ${pageData.name}, a ${pageData.role}.` };
  }
  if (q.includes('skill') || q.includes('technology') || q.includes('tech stack')) {
    return { isHtml: false, message: `My skills include: ${pageData.skills.join(', ')}.` };
  }
  if (q.includes('project')) {
    return {
      isHtml: true,
      message: `Featured projects:<br>${pageData.projects.map((p, i) => `${i + 1}. ${p}`).join('<br>')}<br><br>Open details: ${linkTag(pageData.links.projects, 'Project Details')}`
    };
  }
  if (q.includes('education') || q.includes('study') || q.includes('degree')) {
    return { isHtml: false, message: `Education: ${pageData.education}` };
  }
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('linkedin') || q.includes('github')) {
    return {
      isHtml: true,
      message:
        `Contact me:<br>` +
        `Email: ${linkTag(`mailto:${pageData.contact.email}`, pageData.contact.email)}<br>` +
        `LinkedIn: ${linkTag(pageData.contact.linkedin, 'View LinkedIn')}<br>` +
        `GitHub: ${linkTag(pageData.contact.github, 'View GitHub')}`
    };
  }
  if (q.includes('cv') || q.includes('resume')) {
    return {
      isHtml: true,
      message:
        `You can view my CV and resume here:<br>` +
        `${linkTag(pageData.links.cv, 'Open CV Page')}<br>` +
        `${linkTag(pageData.links.resume, 'Download Resume PDF')}`
    };
  }
  if (q.includes('experience') || q.includes('work')) {
    return { isHtml: false, message: "I have experience in Mobile App Development, Data Engineering at IVIS Lab, and Python certification from Infosys Springboard." };
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return {
      isHtml: true,
      message:
        `Hello! I'm ${pageData.name}.<br>` +
        `Ask me about skills, projects, education, or contact details.<br><br>` +
        `Quick links: ${linkTag(pageData.links.projects, 'Projects')} | ${linkTag(pageData.links.cv, 'CV')} | ${linkTag(pageData.links.portfolio, 'Portfolio')}`
    };
  }
  
  return {
    isHtml: true,
    message:
      `I can help with skills, projects, education, experience, and contact details.<br>` +
      `Try: "show projects", "contact", or "open cv".`
  };
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

  function addMessage(text, isUser, isHtml = false) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    if (isHtml && !isUser) {
      msg.innerHTML = text;
    } else {
      msg.textContent = text;
    }
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addQuickActions() {
    const wrap = document.createElement('div');
    wrap.className = 'chat-quick-actions';
    wrap.innerHTML = `
      <a class="quick-link" href="project.html" target="_blank" rel="noopener noreferrer">Projects</a>
      <a class="quick-link" href="cv.html" target="_blank" rel="noopener noreferrer">CV</a>
      <a class="quick-link" href="https://github.com/Vivek7892" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a class="quick-link" href="https://linkedin.com/in/vivek-v-a0a41225a" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a class="quick-link" href="mailto:vivekvvivekv70@gmail.com">Email</a>
    `;
    chatMessages.appendChild(wrap);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleSend() {
    const query = chatInput.value.trim();
    if (!query) return;
    
    addMessage(query, true);
    chatInput.value = '';
    
    setTimeout(() => {
      const response = analyzeQuery(query);
      addMessage(response.message, false, response.isHtml);
    }, 500);
  }

  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  addMessage("Hi! I'm your portfolio assistant.", false);
  addMessage(
    `You can ask about skills, projects, experience, education, CV, and contact details.<br>` +
    `Or use these direct links:`,
    false,
    true
  );
  addQuickActions();
});
