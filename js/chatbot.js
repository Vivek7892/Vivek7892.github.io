/* ============================================
   VIVEK V — AI Portfolio Chatbot
   ============================================ */

const KB = {
  name: "Vivek V",
  role: "Full Stack Developer & Mobile App Developer",
  location: "Mysuru, Karnataka, India",
  available: true,
  availableFor: "Internships, Freelance Projects & Full Stack Developer Roles",
  email: "vivekvvivekv70@gmail.com",
  linkedin: "https://linkedin.com/in/vivek-v-a0a41225a",
  github: "https://github.com/Vivek7892",
  website: "https://vivekv.me",
  resume: "resume/VIVEK V.pdf",

  education: {
    degree: "BE in Computer Science and Data Science",
    college: "ATME College of Engineering, Mysuru",
    university: "Visvesvaraya Technological University, Belagavi",
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
        "Developed IoT Home Automation system with device-control logic",
        "Used Git for version control and team collaboration"
      ],
      tech: "Flutter · Dart · REST APIs · Git"
    }
  ],

  projects: [
    {
      id: "resume-screener",
      name: "AI Resume Screener",
      emoji: "🤖",
      desc: "AI-powered resume screening system that automates candidate evaluation. Parses resumes, matches against job descriptions using NLP and semantic similarity, ranks candidates with ATS-style evaluation.",
      tech: ["Flask", "Python", "NLP", "scikit-learn", "spaCy", "Machine Learning"],
      github: "https://github.com/Vivek7892/Resume-Screener.git",
      live: "https://resume-screener-1-l538.onrender.com",
      status: "ongoing",
      category: "ai"
    },
    {
      id: "rag-chatbot",
      name: "RAG Student Chatbot",
      emoji: "💬",
      desc: "Full-stack AI student assistant on MERN stack with RAG pipeline. Students upload PDFs/DOCX and get context-aware answers via real-time Socket.IO chat. OTP auth, vector search with OpenSearch.",
      tech: ["React", "Node.js", "MongoDB", "LangChain", "Socket.IO", "Flask", "OpenSearch"],
      github: "https://github.com/Vivek7892/AI-powered-Student-Chatbot-using-RAG-with-Langchain.git",
      live: "https://ai-powered-student-chatbot-using-rag-i5r3.onrender.com",
      status: "live",
      category: "ai"
    },
    {
      id: "iot-home",
      name: "IoT Home Automation",
      emoji: "🏠",
      desc: "Flutter app for managing smart home channels, devices, scenes, and user permissions. Full onboarding with QR-code and Wi-Fi setup, BLE communication.",
      tech: ["Flutter", "Dart", "BLE", "Wi-Fi", "Firebase"],
      github: "https://github.com/Vivek7892",
      status: "completed",
      category: "mobile"
    },
    {
      id: "ddos",
      name: "DDoS Detection System",
      emoji: "🛡️",
      desc: "Random Forest classifier on 100K+ network traffic samples achieving 95%+ detection accuracy. Real-time classification pipeline and Flask monitoring dashboard.",
      tech: ["Python", "Scikit-learn", "Pandas", "Flask"],
      github: "https://github.com/Vivek7892/DDoS-Detection-in-SDN-with-ML.git",
      status: "completed",
      category: "ai"
    },
    {
      id: "remindly",
      name: "Remindly — Reminder App",
      emoji: "⏰",
      desc: "Cross-platform Flutter reminder app with local push notifications, SQLite persistence, category-based organisation, and daily agenda view.",
      tech: ["Flutter", "Dart", "SQLite", "Local Notifications"],
      github: "https://github.com/Vivek7892",
      status: "completed",
      category: "mobile"
    },
    {
      id: "weather",
      name: "Weather App — Flutter",
      emoji: "🌤️",
      desc: "Live weather and 7-day forecast using OpenWeatherMap API. GPS location detection, manual city search, handles offline states gracefully.",
      tech: ["Flutter", "Dart", "OpenWeatherMap API", "Geolocator"],
      github: "https://github.com/Vivek7892/Weather_app_Flutter.git",
      status: "completed",
      category: "mobile"
    }
  ],

  skills: {
    "Frontend": ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
    "Mobile": ["Flutter", "Dart", "Android Development", "Cross-Platform Apps"],
    "Backend": ["Node.js", "Express.js", "Flask", "REST APIs"],
    "Database": ["MongoDB", "MySQL", "Firebase", "SQLite"],
    "AI / ML": ["LangChain", "RAG", "OpenAI", "NLP", "scikit-learn", "Vector Databases"],
    "Tools": ["Git", "GitHub", "VS Code", "Postman", "Docker", "Render", "Vercel"]
  },

  research: {
    title: "A Review on RAG-Based Student Assistant Chatbot using LangChain",
    journal: "EPRA IJRD, Vol. 10, Issue 8, Aug 2025",
    doi: "https://doi.org/10.36713/epra23698"
  }
};

/* ── Helpers ─────────────────────────────── */
function lnk(href, label, cls = "") {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="${cls}">${label}</a>`;
}

function projectCard(p) {
  const statusMap = { ongoing: "🟡 Ongoing", live: "🟢 Live", completed: "✅ Completed" };
  const techTags = p.tech.map(t => `<span class="cb-tag">${t}</span>`).join("");
  const btns = [
    p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="cb-btn cb-btn--ghost">GitHub ↗</a>` : "",
    p.live   ? `<a href="${p.live}"   target="_blank" rel="noopener noreferrer" class="cb-btn cb-btn--solid">Live Demo ↗</a>` : ""
  ].filter(Boolean).join("");
  return `
<div class="cb-card">
  <div class="cb-card-head">
    <span class="cb-card-emoji">${p.emoji}</span>
    <div>
      <div class="cb-card-name">${p.name}</div>
      <div class="cb-card-status">${statusMap[p.status] || ""}</div>
    </div>
  </div>
  <div class="cb-card-desc">${p.desc}</div>
  <div class="cb-tags">${techTags}</div>
  ${btns ? `<div class="cb-card-btns">${btns}</div>` : ""}
</div>`;
}

function contactCard() {
  return `
<div class="cb-contact">
  <div class="cb-contact-status">🟢 Available for ${KB.availableFor}</div>
  <a href="mailto:${KB.email}" class="cb-contact-row">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    ${KB.email}
  </a>
  <a href="${KB.linkedin}" target="_blank" rel="noopener noreferrer" class="cb-contact-row">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
    LinkedIn Profile ↗
  </a>
  <a href="${KB.github}" target="_blank" rel="noopener noreferrer" class="cb-contact-row">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
    GitHub Profile ↗
  </a>
  <a href="${KB.resume}" download="VIVEK_V.pdf" class="cb-contact-row">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    Download Resume ↓
  </a>
</div>`;
}

/* ── Query Engine ────────────────────────── */
function respond(raw) {
  const q = raw.toLowerCase().trim();

  /* greetings — multilingual */
  if (/^(hi|hello|hey|howdy|sup|yo|namaste|namaskar|vanakkam|hola)\b/.test(q)) {
    return { html: true, msg:
      `<div class="cb-welcome">
        <div class="cb-welcome-title">Hi there! 👋 I'm Vivek's AI Assistant</div>
        <div class="cb-welcome-sub">I can help you explore Vivek's work. What would you like to know?</div>
      </div>` };
  }

  /* who / about */
  if (/\b(who|about|yourself|introduce|vivek)\b/.test(q)) {
    return { html: true, msg:
      `<b>${KB.name}</b> — ${KB.role}<br>
      📍 ${KB.location}<br><br>
      Currently interning at <b>Apsis Solutions</b>, building Flutter apps and backend services.<br><br>
      🟢 <b>Available for</b> ${KB.availableFor}<br><br>
      ${lnk(KB.linkedin, "LinkedIn ↗")} &nbsp;·&nbsp; ${lnk(KB.github, "GitHub ↗")} &nbsp;·&nbsp; ${lnk(KB.resume, "Resume ↓")}` };
  }

  /* availability / hire / internship */
  if (/\b(available|hire|hiring|internship|freelance|opportunity|job|work)\b/.test(q)) {
    return { html: true, msg:
      `🟢 <b>Yes! Vivek is available.</b><br><br>
      Open for: <b>${KB.availableFor}</b><br><br>
      Best way to reach him:<br>
      ${lnk("mailto:" + KB.email, "📧 " + KB.email)}<br>
      ${lnk(KB.linkedin, "💼 LinkedIn ↗")}` };
  }

  /* skills */
  if (/\b(skill|tech|stack|language|framework|tool|know|use|work with|technologies)\b/.test(q)) {
    const rows = Object.entries(KB.skills).map(([cat, items]) =>
      `<div class="cb-skill-row"><span class="cb-skill-cat">${cat}</span><span class="cb-skill-items">${items.join(", ")}</span></div>`
    ).join("");
    return { html: true, msg: `<div class="cb-skills">${rows}</div>` };
  }

  /* flutter / mobile */
  if (/\b(flutter|mobile|android|dart|app)\b/.test(q)) {
    const mobileProjects = KB.projects.filter(p => p.category === "mobile");
    return { html: true, msg:
      `Flutter is Vivek's primary mobile framework — used in production at Apsis Solutions.<br><br>
      <b>Mobile Projects:</b><br>` +
      mobileProjects.map(p => projectCard(p)).join("") };
  }

  /* AI projects */
  if (/\b(ai|ml|machine learning|rag|langchain|artificial intelligence|ai project)\b/.test(q)) {
    const aiProjects = KB.projects.filter(p => p.category === "ai");
    return { html: true, msg:
      `<b>Vivek's AI / ML Projects:</b><br>` +
      aiProjects.map(p => projectCard(p)).join("") };
  }

  /* all projects */
  if (/\b(project|portfolio|work|built|show)\b/.test(q)) {
    return { html: true, msg:
      `<b>All Projects (${KB.projects.length}):</b><br>` +
      KB.projects.map(p => projectCard(p)).join("") };
  }

  /* specific project — resume screener */
  if (/\b(resume.?screen|screener)\b/.test(q)) {
    return { html: true, msg: projectCard(KB.projects[0]) };
  }

  /* specific project — rag chatbot */
  if (/\b(student|chatbot|rag|mern|langchain)\b/.test(q)) {
    return { html: true, msg: projectCard(KB.projects[1]) };
  }

  /* specific project — iot */
  if (/\b(iot|home.?auto|smart.?home)\b/.test(q)) {
    return { html: true, msg: projectCard(KB.projects[2]) };
  }

  /* specific project — ddos */
  if (/\b(ddos|network|sdn|security|detection)\b/.test(q)) {
    return { html: true, msg: projectCard(KB.projects[3]) };
  }

  /* experience */
  if (/\b(experience|work|intern|job|apsis|company)\b/.test(q)) {
    const e = KB.experience[0];
    return { html: true, msg:
      `<b>${e.role}</b><br>
      🏢 ${e.company} &nbsp;·&nbsp; ${e.period}<br><br>
      ${e.highlights.map(h => `• ${h}`).join("<br>")}<br><br>
      <i>${e.tech}</i>` };
  }

  /* education */
  if (/\b(education|study|degree|college|university|cgpa|grade|marks|academic)\b/.test(q)) {
    const e = KB.education;
    return { html: true, msg:
      `🎓 <b>${e.degree}</b><br>
      ${e.college} (${e.year})<br>
      CGPA: <b>${e.cgpa}</b> · ${e.university}<br><br>
      ${e.puc}` };
  }

  /* research / paper */
  if (/\b(research|paper|publish|publication|journal|doi)\b/.test(q)) {
    const r = KB.research;
    return { html: true, msg:
      `📄 <b>Published Research Paper</b><br><br>
      "${r.title}"<br>
      <i>${r.journal}</i><br><br>
      ${lnk(r.doi, "Read Paper ↗")}` };
  }

  /* resume / cv */
  if (/\b(cv|resume|download)\b/.test(q)) {
    return { html: true, msg:
      `${lnk(KB.resume, "📄 Download Resume PDF ↓")}<br><br>
      ${lnk(KB.linkedin, "💼 View LinkedIn Profile ↗")}` };
  }

  /* contact */
  if (/\b(contact|email|reach|linkedin|github|hire|connect)\b/.test(q)) {
    return { html: true, msg: contactCard() };
  }

  /* python */
  if (/\bpython\b/.test(q)) {
    return { html: false, msg: "Python is used across Vivek's AI/ML projects — LangChain RAG pipelines, scikit-learn classifiers, Flask APIs, and data engineering with Pandas." };
  }

  /* firebase / cloud */
  if (/\b(firebase|gcp|cloud|google cloud)\b/.test(q)) {
    return { html: false, msg: "Vivek uses Firebase for Flutter backends — Auth (OAuth 2.0, Google Sign-In), Firestore real-time sync, Cloud Functions, and Firebase Storage. He manages IAM, billing, and logs via Google Cloud Console." };
  }

  /* blog */
  if (/\bblog\b/.test(q)) {
    return { html: true, msg:
      `Vivek writes about Firebase/GCP, RAG pipelines, Flutter IoT, DDoS detection, and agentic AI workflows.<br><br>
      ${lnk("blog.html", "Read the Blog ↗")}` };
  }

  /* fallback */
  return { html: true, msg:
    `I can help with:<br>
    • <b>Projects</b> — "show AI projects" or "mobile apps"<br>
    • <b>Skills</b> — "what technologies does Vivek know"<br>
    • <b>Experience</b> — "work experience"<br>
    • <b>Resume</b> — "download resume"<br>
    • <b>Contact</b> — "how to contact Vivek"<br>
    • <b>Availability</b> — "is Vivek available for internships"` };
}

/* ── DOM ─────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const chatBtn      = document.getElementById("chatBtn");
  const chatWidget   = document.getElementById("chatWidget");
  const closeChat    = document.getElementById("closeChat");
  const chatInput    = document.getElementById("chatInput");
  const sendBtn      = document.getElementById("sendBtn");
  const chatMessages = document.getElementById("chatMessages");
  const quickActions = document.getElementById("chatQuickActions");

  if (!chatBtn) return;

  /* open / close */
  chatBtn.addEventListener("click", () => {
    chatWidget.classList.add("active");
    chatBtn.style.display = "none";
    chatInput.focus();
  });
  closeChat.addEventListener("click", closeChatFn);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && chatWidget.classList.contains("active")) closeChatFn();
  });
  function closeChatFn() {
    chatWidget.classList.remove("active");
    chatBtn.style.display = "flex";
  }

  /* add message */
  function addMsg(text, isUser, isHtml = false) {
    const wrap = document.createElement("div");
    wrap.className = "cb-msg-wrap " + (isUser ? "cb-msg-wrap--user" : "cb-msg-wrap--bot");

    if (!isUser) {
      const av = document.createElement("div");
      av.className = "cb-avatar";
      av.textContent = "V";
      wrap.appendChild(av);
    }

    const bubble = document.createElement("div");
    bubble.className = "chat-message " + (isUser ? "user" : "bot");
    if (isHtml && !isUser) bubble.innerHTML = text;
    else bubble.textContent = text;
    wrap.appendChild(bubble);

    chatMessages.appendChild(wrap);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return bubble;
  }

  /* typing indicator */
  function showTyping() {
    const wrap = document.createElement("div");
    wrap.className = "cb-msg-wrap cb-msg-wrap--bot";
    wrap.id = "chatTyping";
    const av = document.createElement("div");
    av.className = "cb-avatar";
    av.textContent = "V";
    const t = document.createElement("div");
    t.className = "chat-typing";
    t.innerHTML = "<span></span><span></span><span></span>";
    wrap.appendChild(av);
    wrap.appendChild(t);
    chatMessages.appendChild(wrap);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function removeTyping() {
    const t = document.getElementById("chatTyping");
    if (t) t.remove();
  }

  /* stream text effect */
  function streamText(bubble, text, isHtml) {
    if (isHtml) {
      bubble.innerHTML = text;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return;
    }
    bubble.textContent = "";
    let i = 0;
    const iv = setInterval(() => {
      bubble.textContent += text[i++];
      chatMessages.scrollTop = chatMessages.scrollHeight;
      if (i >= text.length) clearInterval(iv);
    }, 12);
  }

  /* send */
  function handleSend() {
    const query = chatInput.value.trim();
    if (!query) return;
    addMsg(query, true);
    chatInput.value = "";
    if (quickActions) quickActions.style.display = "none";
    showTyping();
    const delay = 400 + Math.random() * 300;
    setTimeout(() => {
      removeTyping();
      const res = respond(query);
      const bubble = addMsg("", false, false);
      streamText(bubble, res.msg, res.html);
    }, delay);
  }

  sendBtn.addEventListener("click", handleSend);
  chatInput.addEventListener("keypress", e => { if (e.key === "Enter") handleSend(); });

  /* quick chips */
  if (quickActions) {
    quickActions.querySelectorAll(".quick-chip[data-query]").forEach(chip => {
      chip.addEventListener("click", () => {
        chatInput.value = chip.dataset.query;
        handleSend();
      });
    });
  }

  /* welcome */
  addMsg(
    `<div class="cb-welcome"><div class="cb-welcome-title">Hi, I'm Vivek's AI Assistant 👋</div><div class="cb-welcome-sub">Ask me about projects, skills, experience, or how to contact Vivek.</div></div>`,
    false, true
  );

  /* scroll-to-top button */
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    const content = document.getElementById("colContent") || document.documentElement;
    const target = content.tagName === "MAIN" ? content : window;
    (content.tagName === "MAIN" ? content : window).addEventListener("scroll", () => {
      const scrollY = content.tagName === "MAIN" ? content.scrollTop : window.scrollY;
      scrollBtn.classList.toggle("visible", scrollY > 300);
    });
    scrollBtn.addEventListener("click", () => {
      if (content.tagName === "MAIN") content.scrollTo({ top: 0, behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
