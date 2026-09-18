const projectData = {
  "ai-security": {
    kicker: "AI Security • 2026",
    title: "Generative AI Phishing & Social-Engineering Risk",
    summary: "A security-risk analysis connecting the growing realism of AI-assisted phishing to practical organizational controls.",
    details: [["Framework", "NIST AI RMF: Govern, Map, Measure, Manage"], ["Risk areas", "Confidentiality, privacy, financial, and operational impact"], ["Approach", "Threat analysis with technical and administrative recommendations"], ["Outcome", "A structured, business-aware risk treatment strategy"]],
    tags: ["NIST AI RMF", "Generative AI", "Phishing", "Risk Analysis"]
  },
  "software-security": {
    kicker: "Software Security • Presentation",
    title: "Protecting Our Company’s Digital Future",
    summary: "A presentation designed to make common software threats understandable while showing how employees and technical teams can reduce risk together.",
    details: [["Threats", "Phishing, malware, SQL injection, XSS, and weak passwords"], ["Technical controls", "Encryption, secure coding, access controls, and testing"], ["Human controls", "Security awareness, strong authentication, and reporting"], ["Format", "10–15 slide presentation with security guidelines"]],
    tags: ["CIA Triad", "OWASP", "Secure Coding", "Awareness"]
  },
  network: {
    kicker: "Network Infrastructure • Academic Project",
    title: "Secure Network Architecture",
    summary: "Designed security-minded network architecture models for simulated enterprise environments and documented the controls protecting each layer.",
    details: [["Focus", "Secure enterprise network design"], ["Principles", "Confidentiality, integrity, and availability"], ["Work", "Network components, security requirements, and control documentation"], ["Context", "Bowie State University academic projects"]],
    tags: ["Network Design", "Infrastructure", "CIA Triad", "Controls"]
  },
  systems: {
    kicker: "Systems • Academic Labs",
    title: "Systems Administration & Access Management",
    summary: "Configured Windows Server and Linux environments while practicing identity, access, permissions, system configuration, and documentation.",
    details: [["Platforms", "Linux and Windows Server"], ["Administration", "Users, permissions, and access controls"], ["Operations", "System configuration and technical documentation"], ["Context", "Bowie State University academic labs"]],
    tags: ["Linux", "Windows Server", "Access Management", "IAM"]
  },
  vulnerability: {
    kicker: "Security Analysis • Academic Labs",
    title: "Vulnerability & Data Classification",
    summary: "Assessed simulated enterprise assets, classified data by sensitivity, and translated technical findings into confidentiality, integrity, availability, and business-risk language.",
    details: [["Assessment", "Identified vulnerabilities in simulated assets"], ["Data", "Classified information by sensitivity"], ["Risk lens", "CIA impact and business consequences"], ["Outcome", "Clearer prioritization of security needs"]],
    tags: ["Vulnerability Analysis", "Data Classification", "CIA Triad", "Risk"]
  }
};

const intents = [
  {
    keys: ["skill", "skills", "technology", "technologies", "tools", "know", "technical"],
    response: "Glory’s core skills include Linux, Windows Server, network infrastructure, secure network architecture, system configuration, access management, vulnerability analysis, data classification, SQL, database management, Excel, risk analysis, technical documentation, and NIST AI RMF."
  },
  {
    keys: ["school", "education", "university", "degree", "major", "graduate", "graduation", "studying"],
    response: "Glory is a Computer Technology senior at Bowie State University. Her track is Network Enterprise Infrastructure, and she expects to graduate in May 2027."
  },
  {
    keys: ["project", "projects", "portfolio", "work", "built", "created"],
    response: "Her featured work includes an AI phishing risk analysis using NIST AI RMF, a Software Security presentation, secure network architecture, systems administration and access management labs, and vulnerability and data-classification analysis. Scroll to Projects to explore each one."
  },
  {
    keys: ["ai", "artificial", "nist", "phishing", "social", "rmf"],
    response: "For her 2026 AI Security Risk Analysis, Glory applied NIST AI RMF’s Govern, Map, Measure, and Manage functions to generative-AI phishing and social-engineering risk. She analyzed CIA, privacy, financial, and operational impacts and recommended technical and administrative controls."
  },
  {
    keys: ["software", "sql", "xss", "malware", "presentation", "owasp"],
    response: "Her Software Security presentation explains phishing, malware, SQL injection, XSS, weak passwords, encryption, and both technical and employee-focused security practices."
  },
  {
    keys: ["experience", "years", "background", "lab", "labs"],
    response: "Glory has 3+ years of hands-on academic experience securing and administering simulated enterprise environments through Bowie State projects and labs."
  },
  {
    keys: ["role", "roles", "job", "jobs", "career", "seeking", "interested", "opportunity", "opportunities"],
    response: "She is preparing for cybersecurity, technology risk, GRC, IT support, and infrastructure internships or entry-level roles."
  },
  {
    keys: ["contact", "email", "reach", "hire", "connect"],
    response: "You can reach Glory at gloryimo2@gmail.com or use the contact form on this page."
  },
  {
    keys: ["resume", "cv", "download"],
    response: "You can view or download Glory’s one-page resume in the Resume section."
  },
  {
    keys: ["github", "repository", "repo", "source", "code"],
    response: "You can review the complete source code in Glory’s GitHub repository at github.com/gloryimo-3745/glory-imo-portfolio."
  },
  {
    keys: ["hello", "hi", "hey", "good morning", "good afternoon"],
    response: "Hey! ♡ I can tell you about Glory’s skills, education, projects, experience, resume, or the roles she’s seeking."
  },
  {
    keys: ["bye", "goodbye", "thanks", "thank you"],
    response: "You’re welcome! Thanks for visiting Glory’s portfolio ♡"
  }
];

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

function botReply(question) {
  const clean = normalize(question);
  if (!clean) return "Type a question and I’ll help you out ♡";
  let best = null;
  let score = 0;
  for (const intent of intents) {
    const current = intent.keys.reduce((total, key) => total + (clean.includes(key) ? (key.includes(" ") ? 3 : 1) : 0), 0);
    if (current > score) { best = intent; score = current; }
  }
  return best ? best.response : "I’m not totally sure about that yet. Try asking about Glory’s skills, education, projects, experience, resume, career goals, or contact information."
}

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuButton?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

const dialog = document.querySelector("#project-dialog");
document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectData[button.closest("[data-project]").dataset.project];
    document.querySelector("#dialog-kicker").textContent = project.kicker;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-summary").textContent = project.summary;
    document.querySelector("#dialog-details").innerHTML = project.details.map(([label, value]) => `<div class="dialog-detail"><strong>${label}</strong><span>${value}</span></div>`).join("");
    document.querySelector("#dialog-tags").innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
    dialog.showModal();
  });
});
document.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

const contactForm = document.querySelector("#contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(data.get("subject"));
  const body = encodeURIComponent(`Hi Glory,\n\n${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`);
  document.querySelector("#form-note").textContent = "Your email app is opening now ♡";
  window.location.href = `mailto:gloryimo2@gmail.com?subject=${subject}&body=${body}`;
});

const chatbot = document.querySelector("#chatbot");
const launcher = document.querySelector("#chat-launcher");
const chatMessages = document.querySelector("#chat-messages");
const chatInput = document.querySelector("#chat-input");

function setChat(open) {
  chatbot.hidden = !open;
  launcher.setAttribute("aria-expanded", String(open));
  if (open) setTimeout(() => chatInput.focus(), 50);
}
launcher?.addEventListener("click", () => setChat(chatbot.hidden));
document.querySelector("#chat-close")?.addEventListener("click", () => setChat(false));

function addMessage(text, who) {
  const message = document.createElement("div");
  message.className = `message ${who}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function ask(question) {
  if (!question.trim()) return;
  addMessage(question, "user");
  chatInput.value = "";
  setTimeout(() => addMessage(botReply(question), "bot"), 320);
}

document.querySelector("#chat-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  ask(chatInput.value);
});
document.querySelectorAll("#quick-replies button").forEach((button) => button.addEventListener("click", () => ask(button.textContent)));
