/* chatbot.js — portfolio assistant for vivekv.me */

const BOT_DATA = {
  name: "Vivek V",
  role: "Software & Mobile Developer",
  location: "Mysuru, India",
  available: true,
  education: {
    degree: "BE in Computer Science and Data Science",
    college: "ATME College of Engineering, Mysuru",
    university: "Visvesvaraya Technological University",
    cgpa: "8.57",
    year: "2022 – 2026",
    puc: "JSS PU College, SJCE Campus — 91.17% (2020–2022)"
  },
  experience: [
    {
      role: "Mobile Application Development Intern",
      company: "Apsis Solutions",
      period: "Feb 2025 – Present",
      highlights: [
        "Built cross-platform Flutter apps with clean UI and smooth navigation",
        "Integrated REST APIs and connected mobile clients to backend services",
        "Developed a Home Automation system with device-control logic",
        "Built a real-time Weather Forecast app using OpenWeatherMap API",
        "Used Git for version control and team collaboration"
      ],
      tech: "Flutter · Dart · REST APIs · Git"
    },
    {
      role: "Data Engineering Training",
      company: "IVIS Lab",
      period: "2023",
      highlights: [
        "Processed and cleaned large datasets using Python and Pandas",
        "Built data pipelines for structured data ingestion and transformation",
        "Worked with research-grade datasets in a lab environment"
      ],
      tech: "Python · Pandas · Data Pipelines"
    }
  ],
  projects: [
    {
      name: "AI Student Assistant — MERN + RAG",
      desc: "Full-stack AI chatbot with RAG pipeline. Students upload PDFs/DOCX and get context-aware answers via real-time Socket.IO chat. OTP-based auth, vector search with OpenSearch.",
      tech: "React · Node.js · Express · MongoDB · LangChain · Socket.IO · Python · Flask",
      github: "https://github.com/Vivek7892/AI-powered-Student-Chatbot-using-RAG-with-Langchain.git",
      live: "https://ai-powered-student-chatbot-using-rag-i5r3.onrender.com"
    },
    {
      name: "IoT Home Automation — Flutter",
      desc: "Flutter app for managing smart home channels, devices, scenes, and user permissions. Full onboarding with QR-code and Wi-Fi setup, BLE communication.",
      tech: "Flutter · Dart · BLE · Wi-Fi · mobile_scanner",
      github: "https://github.com/Vivek7892"
    },
    {
      name: "DDoS Detection in SDN with ML",
      desc: "Random Forest classifier on 100K+ network traffic samples achieving 95%+ detection accuracy. Real-time classification pipeline and Flask monitoring dashboard.",
      tech: "Python · Scikit-learn · Pandas · Flask",
      github: "https://github.com/Vivek7892/DDoS-Detection-in-SDN-with-ML.git"
    },
    {
      name: "AI Document Verification System",
      desc: "OCR-based text extraction from identity documents with field comparison and mismatch detection. Flask app with admin dashboard and MongoDB audit tracking.",
      tech: "Python · Flask · OpenCV · Tesseract OCR · MongoDB"
    },
    {
      name: "Remindly — Reminder App",
      desc: "Cross-platform Flutter reminder app with local push notifications, SQLite persistence, category-based organisation, and daily agenda view.",
      tech: "Flutter · Dart · SQLite · Local Notifications"
    },
    {
      name: "Weather App — Flutter",
      desc: "Live weather and 7-day forecast using OpenWeatherMap API. GPS location detection, manual city search, handles offline states gracefully.",
      tech: "Flutter · Dart · OpenWeatherMap API · Geolocator",
      github: "https://github.com/Vivek7892/Weather_app_Flutter.git"
    }
  ],
  skills: {
    languages: "Python · JavaScript · Dart · C · SQL",
    web: "Flask · Node.js · Express · REST APIs · HTML · CSS",
    mobile: "Flutter · Dart · Firebase · BLE · Wi-Fi",
    databases: "MongoDB · MySQL · SQLite · OpenSearch",
    cloud: "Firebase · Firebase Auth · OAuth 2.0 · Firestore · Cloud Functions · GCP",
    ai: "LangChain · RAG · Scikit-learn · Pandas · OpenCV",
    tools: "Git · GitHub · Postman · Docker · Socket.IO · VS Code"
  },
  research: {
    title: "A Review on RAG-Based Student Assistant Chatbot using LangChain",
    journal: "EPRA IJRD, Vol. 10, Issue 8, Aug 2025",
    doi: "https://doi.org/10.36713/epra23698"
  },
  certifications: ["Python Foundations — Infosys Springboard", "Data Engineering Training — IVIS Lab"],
  contact: {
    email: "vivekvvivekv70@gmail.com",
    linkedin: "https://linkedin.com/in/vivek-v-a0a41225a",
    github: "https://github.com/Vivek7892",
    website: "https://vivekv.me"
  },
  links: {
    portfolio: "index.html",
    projects: "project.html",
    cv: "cv.html",
    resume: "resume/VIVEK V.pdf",
    blog: "blog.html"
  }
};

function a(href, label) {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function analyzeQuery(query) {
  const q = query.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|howdy|sup|yo)\b/.test(q)) {
    return {
      isHtml: true,
      message:
        `Hey! I'm ${BOT_DATA.name}'s portfolio assistant.<br>` +
        `Ask me about <b>skills</b>, <b>projects</b>, <b>experience</b>, <b>education</b>, or <b>contact</b>.`
    };
  }

  // Who / name / about
  if (/\b(who|name|about|yourself|introduce)\b/.test(q)) {
    return {
      isHtml: true,
      message:
        `<b>${BOT_DATA.name}</b> — ${BOT_DATA.role}<br>` +
        `Based in ${BOT_DATA.location}. Currently interning at Apsis Solutions building Flutter apps and backend services.<br>` +
        `${BOT_DATA.available ? '🟢 Available for full-time roles.' : ''}<br><br>` +
        `${a(BOT_DATA.links.portfolio, 'Portfolio')} · ${a(BOT_DATA.links.cv, 'CV')} · ${a(BOT_DATA.contact.linkedin, 'LinkedIn')}`
    };
  }

  // Skills / tech stack
  if (/\b(skill|tech|stack|language|framework|tool|know|use|work with)\b/.test(q)) {
    const s = BOT_DATA.skills;
    return {
      isHtml: true,
      message:
        `<b>Languages:</b> ${s.languages}<br>` +
        `<b>Web/Backend:</b> ${s.web}<br>` +
        `<b>Mobile:</b> ${s.mobile}<br>` +
        `<b>Databases:</b> ${s.databases}<br>` +
        `<b>Cloud/GCP:</b> ${s.cloud}<br>` +
        `<b>AI/ML:</b> ${s.ai}<br>` +
        `<b>Tools:</b> ${s.tools}`
    };
  }

  // Specific skill queries
  if (/\bflutter\b/.test(q)) {
    return { isHtml: false, message: "Flutter is Vivek's primary mobile framework. He's built IoT home automation, weather, and reminder apps with it — including production work at Apsis Solutions." };
  }
  if (/\bpython\b/.test(q)) {
    return { isHtml: false, message: "Python is used across Vivek's AI/ML projects — LangChain RAG pipelines, Scikit-learn classifiers, Flask APIs, OpenCV document processing, and data engineering with Pandas." };
  }
  if (/\b(rag|langchain|ai|ml|machine learning)\b/.test(q)) {
    return {
      isHtml: true,
      message:
        `Vivek works with LangChain and RAG pipelines for AI projects. His AI Student Assistant uses document chunking, vector embeddings, and OpenSearch for semantic retrieval.<br><br>` +
        `He also published a research paper on this: ${a(BOT_DATA.research.doi, 'DOI ↗')}`
    };
  }
  if (/\b(firebase|gcp|cloud|google cloud)\b/.test(q)) {
    return { isHtml: false, message: "Vivek uses Firebase for Flutter backends — Auth (OAuth 2.0, Google Sign-In), Firestore real-time sync, Cloud Functions, and Firebase Storage. He manages IAM, billing, and logs via Google Cloud Console." };
  }

  // Projects
  if (/\bproject\b/.test(q)) {
    const list = BOT_DATA.projects.map((p, i) =>
      `${i + 1}. <b>${p.name}</b> — ${p.desc.split('.')[0]}.`
    ).join('<br>');
    return {
      isHtml: true,
      message: `${list}<br><br>${a(BOT_DATA.links.projects, 'View all projects ↗')}`
    };
  }

  // Specific project lookups
  if (/\b(student|chatbot|rag|mern)\b/.test(q)) {
    const p = BOT_DATA.projects[0];
    return {
      isHtml: true,
      message:
        `<b>${p.name}</b><br>${p.desc}<br><br>` +
        `<b>Stack:</b> ${p.tech}<br>` +
        `${a(p.github, 'GitHub ↗')} · ${a(p.live, 'Live demo ↗')}`
    };
  }
  if (/\b(iot|home|automation|smart)\b/.test(q)) {
    const p = BOT_DATA.projects[1];
    return {
      isHtml: true,
      message:
        `<b>${p.name}</b><br>${p.desc}<br><br>` +
        `<b>Stack:</b> ${p.tech}<br>` +
        `${a(p.github, 'GitHub ↗')}`
    };
  }
  if (/\b(ddos|network|sdn|security)\b/.test(q)) {
    const p = BOT_DATA.projects[2];
    return {
      isHtml: true,
      message:
        `<b>${p.name}</b><br>${p.desc}<br><br>` +
        `<b>Stack:</b> ${p.tech}<br>` +
        `${a(p.github, 'GitHub ↗')}`
    };
  }
  if (/\b(weather)\b/.test(q)) {
    const p = BOT_DATA.projects[5];
    return {
      isHtml: true,
      message:
        `<b>${p.name}</b><br>${p.desc}<br><br>` +
        `<b>Stack:</b> ${p.tech}<br>` +
        `${a(p.github, 'GitHub ↗')}`
    };
  }

  // Experience / work / internship
  if (/\b(experience|work|intern|job|apsis|ivis)\b/.test(q)) {
    const exp = BOT_DATA.experience;
    return {
      isHtml: true,
      message:
        `<b>${exp[0].role}</b> @ ${exp[0].company} (${exp[0].period})<br>` +
        exp[0].highlights.slice(0, 3).map(h => `• ${h}`).join('<br>') +
        `<br><i>${exp[0].tech}</i><br><br>` +
        `<b>${exp[1].role}</b> @ ${exp[1].company} (${exp[1].period})<br>` +
        `<i>${exp[1].tech}</i>`
    };
  }

  // Education
  if (/\b(education|study|degree|college|university|cgpa|grade|marks)\b/.test(q)) {
    const e = BOT_DATA.education;
    return {
      isHtml: true,
      message:
        `<b>${e.degree}</b><br>` +
        `${e.college} (${e.year})<br>` +
        `CGPA: <b>${e.cgpa}</b> · ${e.university}<br><br>` +
        `${e.puc}`
    };
  }

  // Research / paper / publication
  if (/\b(research|paper|publish|publication|journal|doi)\b/.test(q)) {
    const r = BOT_DATA.research;
    return {
      isHtml: true,
      message:
        `<b>Published Research Paper</b><br>` +
        `"${r.title}"<br>` +
        `${r.journal}<br><br>` +
        `${a(r.doi, 'Read paper ↗')}`
    };
  }

  // Certifications
  if (/\b(cert|certification|course|infosys)\b/.test(q)) {
    return {
      isHtml: false,
      message: `Certifications:\n• ${BOT_DATA.certifications.join('\n• ')}`
    };
  }

  // CV / resume
  if (/\b(cv|resume|download)\b/.test(q)) {
    return {
      isHtml: true,
      message:
        `${a(BOT_DATA.links.cv, 'Open CV page ↗')}<br>` +
        `${a(BOT_DATA.links.resume, 'Download Resume PDF ↓')}`
    };
  }

  // Contact / email / linkedin / github
  if (/\b(contact|email|reach|linkedin|github|hire|available)\b/.test(q)) {
    const c = BOT_DATA.contact;
    return {
      isHtml: true,
      message:
        `${BOT_DATA.available ? '🟢 Available for opportunities.<br><br>' : ''}` +
        `${a(`mailto:${c.email}`, c.email)}<br>` +
        `${a(c.linkedin, 'LinkedIn ↗')}<br>` +
        `${a(c.github, 'GitHub ↗')}`
    };
  }

  // Blog
  if (/\bblog\b/.test(q)) {
    return {
      isHtml: true,
      message:
        `Vivek writes about Firebase/GCP, RAG pipelines, Flutter IoT, DDoS detection, and agentic AI workflows.<br><br>` +
        `${a(BOT_DATA.links.blog, 'Read the blog ↗')}`
    };
  }

  // Fallback
  return {
    isHtml: true,
    message:
      `I can answer questions about <b>skills</b>, <b>projects</b>, <b>experience</b>, <b>education</b>, <b>research</b>, or <b>contact</b>.<br>` +
      `Try: "show projects", "what skills do you have", "contact info", or "open cv".`
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const chatBtn      = document.getElementById('chatBtn');
  const chatWidget   = document.getElementById('chatWidget');
  const closeChat    = document.getElementById('closeChat');
  const chatInput    = document.getElementById('chatInput');
  const sendBtn      = document.getElementById('sendBtn');
  const chatMessages = document.getElementById('chatMessages');
  const quickActions = document.getElementById('chatQuickActions');

  if (!chatBtn) return;

  chatBtn.addEventListener('click', () => {
    chatWidget.classList.add('active');
    chatBtn.style.display = 'none';
    chatInput.focus();
  });

  closeChat.addEventListener('click', () => {
    chatWidget.classList.remove('active');
    chatBtn.style.display = 'flex';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && chatWidget.classList.contains('active')) {
      chatWidget.classList.remove('active');
      chatBtn.style.display = 'flex';
    }
  });

  function addMessage(text, isUser, isHtml = false) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    if (isHtml && !isUser) msg.innerHTML = text;
    else msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'chat-typing';
    t.id = 'chatTyping';
    t.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(t);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('chatTyping');
    if (t) t.remove();
  }

  function handleSend() {
    const query = chatInput.value.trim();
    if (!query) return;
    addMessage(query, true);
    chatInput.value = '';
    if (quickActions) quickActions.style.display = 'none';
    showTyping();
    setTimeout(() => {
      removeTyping();
      const res = analyzeQuery(query);
      addMessage(res.message, false, res.isHtml);
    }, 480);
  }

  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });

  // Quick chip clicks
  if (quickActions) {
    quickActions.querySelectorAll('.quick-chip[data-query]').forEach(chip => {
      chip.addEventListener('click', () => {
        chatInput.value = chip.dataset.query;
        handleSend();
      });
    });
  }

  // Welcome message
  addMessage(`Hi! Ask me anything about ${BOT_DATA.name}'s work, skills, or projects.`, false, false);
});
