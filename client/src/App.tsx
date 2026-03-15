
import { useState, useEffect, useRef } from "react";

const skills = [
  { name: "Java", icon: "fab fa-java" },
  { name: "Python", icon: "fab fa-python" },
  { name: "JavaScript", icon: "fab fa-js" },
  { name: "TypeScript", icon: "fas fa-code" },
  { name: "React.js", icon: "fab fa-react" },
  { name: "Node.js", icon: "fab fa-node-js" },
  { name: "Express.js", icon: "fas fa-server" },
  { name: "Spring Boot", icon: "fas fa-leaf" },
  { name: "Next.js", icon: "fas fa-bolt" },
  { name: "Tailwind CSS", icon: "fab fa-css3" },
  { name: "MySQL", icon: "fas fa-database" },
  { name: "MongoDB", icon: "fas fa-envira" },
  { name: "Docker", icon: "fab fa-docker" },
  { name: "Kubernetes", icon: "fas fa-dharmachakra" },
  { name: "Git", icon: "fab fa-git-alt" },
];

const education = [
  {
    degree: "B.Tech, CSE(AI & ML)",
    institution: "SRM University, Chennai",
    duration: "2023 - 2027",
    score: "CGPA: 8.36 / 10"
  },
  {
    degree: "Class XII (MPC)",
    institution: "Tirumala Educational Institutes, Rajahmundry",
    duration: "2021 - 2023",
    score: "Percentage: 92.2%"
  },
  {
    degree: "Class X (SSC)",
    institution: "Narayana E-Techno School, Narsipatnam",
    duration: "2020 - 2021",
    score: "Score: 595 / 600"
  }
];

const projects = [
  {
    title: "Podcastr — Full-Stack Podcast Platform",
    description: "Built a podcast web application where users can browse, search, and play audio content. Implemented secure authentication, search functionality, and a dynamic podcast player.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Convex", "OpenAI", "Clerk Auth"],
    github: "#"
  },
  {
    title: "Stock Screener Web App",
    description: "Built a real-time stock tracking and filtering web app that lets users view live prices, personalized alerts, and detailed company insights. Integrated REST APIs to fetch stock data.",
    tech: ["React.js", "Next.js", "TypeScript", "REST APIs"],
    github: "https://github.com/koushalchintakayala/stock-screener"
  }
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

function useTypingEffect(words: string[], typingSpeed = 200, deletingSpeed = 100, pauseTime = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const checkScroll = () => {
      const triggerBottom = (window.innerHeight / 5) * 4;
      revealElements.forEach((el) => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);
}

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "dark" | "light") || "dark";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const typedText = useTypingEffect(["DSA & Problem Solving Specialist", "Java & Spring Boot Developer", "Full-Stack Web Architect", "AIML Practitioner"]);
  useScrollReveal();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        if (top >= offset && top < offset + height && id) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
      <>
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo" data-testid="logo" onClick={() => scrollToSection("#home")}>KL.</div>
          <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
            {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                      className={activeSection === link.href.slice(1) ? "active" : ""}
                      onClick={() => scrollToSection(link.href)}
                      data-testid={`nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </a>
                </li>
            ))}
          </ul>
          <div className="nav-extras">
            <div className="theme-switch-wrapper">
              <label className="theme-switch">
                <input
                    type="checkbox"
                    checked={theme === "light"}
                    onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                    data-testid="theme-toggle"
                />
                <div className="slider round"></div>
              </label>
              <i className="fas fa-moon"></i>
            </div>
            <div
                className="hamburger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="hamburger-menu"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-content scroll-reveal">
            <h3>Hi, I am</h3>
            <h1>KOUSHAL <span>CHINTAKAYALA</span></h1>
            <h3 className="typing-text">
              <span className="type-effect">{typedText}</span>
              <span style={{opacity: 0.7}}>|</span>
            </h3>
            <div className="social-icons">
              <a
                  href="https://www.linkedin.com/in/koushalchintakayala7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="social-linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                  href="https://github.com/koushalchintakayala"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="social-github"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                  href="https://leetcode.com/u/koushalchintakayala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="social-leetcode"
              >
                <i className="fas fa-code"></i>
              </a>
            </div>
            <div className="hero-btns">
              <a href="assets/resume.pdf" download className="btn" data-testid="button-resume">
                Download Resume
              </a>
              <a
                  className="btn btn-secondary"
                  onClick={() => scrollToSection("#contact")}
                  data-testid="button-contact"
              >
                Contact Me
              </a>
            </div>
          </div>
          <div className="hero-img scroll-reveal">
            <div className="img-box">
              <img src="/assets/profile.png" alt="Koushal Chintakayala"
                   style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <h2 className="section-title">
            My <span>Story</span>
          </h2>
          <div className="about-content">
            <div className="about-text scroll-reveal">
              <h1>I am,</h1>
              <p style={{marginTop: '1rem'}}>
                a software engineer driven by curiosity, discipline, and the satisfaction of building systems that work reliably at scale. What began as a fascination with logic and problem-solving evolved into mastering <i>Java, Python, and Data Structures & Algorithms</i>—not as theory, but as tools to think clearly and build dependable solutions.
              </p>
              <p style={{marginTop: '1.5rem'}}>
                I design scalable backend architectures using <i>Node.js, Express.js, MongoDB, and Spring Boot</i>, focusing on clean APIs, performance, and maintainability. On the frontend, I work with <i>React and TypeScript</i> to create interfaces that are intuitive and purposeful.
              </p>
              <p style={{marginTop: '1.5rem'}}>
                Alongside system design, I explore AI and machine learning to turn data into meaningful intelligence using Python and modern ML libraries. My approach remains constant: build technology that is robust, extensible, and built to last.
              </p>
              <p style={{marginTop: '1.5rem'}}>
                For me, software engineering is defined by execution, thoughtful decisions, and the real-world impact of the systems I create.
              </p>
            </div>
          </div>
        </section>



        {/* Skills Section */}
        <section id="skills" className="skills">
          <h2 className="section-title">
            My <span>Skills</span>
          </h2>
          <div className="skills-container">
            {skills.map((skill, index) => (
                <div className="skill-card scroll-reveal" key={skill.name} data-testid={`skill-card-${index}`}>
                  <i className={skill.icon}></i>
                  <h3>{skill.name}</h3>
                </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects">
          <h2 className="section-title">
            Latest <span>Projects</span>
          </h2>
          <div className="projects-container">
            {projects.map((project, index) => (
                <div className="project-card scroll-reveal" key={index}>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tech-stack">
                      {project.tech.map((t, i) => (
                          <span key={i}>{t}</span>
                      ))}
                    </div>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon"
                    >
                      <i className="fab fa-github"></i> View Code
                    </a>
                  </div>
                </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <h2 className="section-title">
            Contact <span>Me</span>
          </h2>
          <div className="contact-container scroll-reveal">
            <div className="contact-info">
              <div className="contact-card" data-testid="contact-phone">
                <i className="fas fa-phone-alt"></i>
                <h4>Phone</h4>
                <p><a href="tel:+916304157622">+91 6304 157 622</a></p>
              </div>
              <div className="contact-card" data-testid="contact-email">
                <i className="fas fa-envelope"></i>
                <h4>Email</h4>
                <p><a href="mailto:k2828@srmist.edu.in">kc2828@srmist.edu.in</a></p>
              </div>
              <div className="contact-card" data-testid="contact-linkedin">
                <i className="fab fa-linkedin-in"></i>
                <h4>LinkedIn</h4>
                <a
                    href="https://www.linkedin.com/in/koushalchintakayala7/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  Connect
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="section-divider"></div>


        <footer className="a-footer-wrap">
          <div className="footer-top">
            {/* Left */}
            <div className="footer-left">
              <h2 className="a-footer-title">Koushal Chintakayala</h2>
              <p className="a-tags">Software Engineer | Backend & AI Systems</p>

              <div className="social-icons">
                <a
                    href="https://www.linkedin.com/in/koushalchintakayala7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="social-linkedin"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                    href="https://github.com/koushalchintakayala"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="social-github"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                    href="https://leetcode.com/u/koushalchintakayala/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="social-leetcode"
                >
                  <i className="fas fa-code"></i>
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="footer-right">
              <p>Phone: <a href="tel:+916304157622">+91 6304 157 622</a></p>
              <p>Email: <a href="mailto:k2828@srmist.edu.in">k2828@srmist.edu.in</a></p>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <p className="a-rights"> 2026 © All rights reserved | Koushal Chintakayala.</p>
            <a  onClick={() => scrollToSection("#home")}>
              <i className="fas fa-arrow-up"></i>
            </a>

          </div>

          {/* Big faded text */}
          <div className="a-footer-flash">
            <span className="a-footer-flush-text">Developer. Designer.</span>
          </div>
        </footer>


      </>
  );
}

export default App;
