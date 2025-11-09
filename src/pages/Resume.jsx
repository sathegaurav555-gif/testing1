import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaLaptopCode,
  FaUpload,
  FaSignOutAlt,
  FaFilePdf,
} from "react-icons/fa";
import { SiJavascript, SiTailwindcss } from "react-icons/si";
import { MdWork } from "react-icons/md";

function Resume({ onLogout }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeURL, setResumeURL] = useState(null);

  // Load saved resume from localStorage
  useEffect(() => {
    const savedResume = localStorage.getItem("resumeFile");
    if (savedResume) {
      const { name, type, data } = JSON.parse(savedResume);
      const blob = new Blob([Uint8Array.from(atob(data), (c) => c.charCodeAt(0))], { type });
      const fileURL = URL.createObjectURL(blob);
      setResumeFile({ name, type });
      setResumeURL(fileURL);
    }
  }, []);

  const profile = {
    name: "Gaurav Patil",
    title: "Frontend Developer | React Enthusiast",
    email: "gauravpatil@example.com",
    phone: "+91 98765 43210",
    location: "Pune, Maharashtra, India",
    summary:
      "A passionate web developer with experience in building responsive and interactive web applications using React.js and modern front-end technologies. I love creating clean UI and seamless user experiences.",
  };

  const skills = [
    { name: "React.js", icon: <FaReact color="#61DBFB" /> },
    { name: "JavaScript (ES6+)", icon: <SiJavascript color="#F7DF1E" /> },
    { name: "HTML5", icon: <FaHtml5 color="#E34F26" /> },
    { name: "CSS3", icon: <FaCss3Alt color="#1572B6" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss color="#38BDF8" /> },
    { name: "Node.js (Basics)", icon: <FaNodeJs color="#8CC84B" /> },
    { name: "Git & GitHub", icon: <FaGitAlt color="#F1502F" /> },
  ];

  const projects = [
    {
      name: "IRCTC Online Ticket Booking",
      desc: "Developed a responsive web app for train ticket booking with real-time seat availability and payment gateway integration.",
      icon: <MdWork color="#FFD369" />,
    },
    {
      name: "Crop Detection & Govt Schemes Portal",
      desc: (
        <>
          AI-integrated portal helping farmers identify crops and access government schemes with daily agricultural news updates. <br />
          <a
            href="https://huggingface.co/spaces/nurturingagriculture/agriculture-project-testing"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            🌐 View Project on Hugging Face
          </a>
        </>
      ),
      icon: <FaLaptopCode color="#FFD369" />,
    },
  ];

  // Handle resume upload + save
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      alert("Please upload a PDF or DOCX file!");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const base64 = btoa(
        new Uint8Array(event.target.result).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      localStorage.setItem(
        "resumeFile",
        JSON.stringify({ name: file.name, type: file.type, data: base64 })
      );

      const fileURL = URL.createObjectURL(file);
      setResumeFile(file);
      setResumeURL(fileURL);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <motion.div
      className="resume-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header with Logout */}
      <div className="resume-header">
        <h1>My Resume</h1>
        <button className="logout-btn" onClick={onLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Profile Section */}
      <motion.div
        className="profile-card"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <FaUserCircle className="profile-icon" />
        <h1>{profile.name}</h1>
        <h3>{profile.title}</h3>

        <div className="profile-details">
          <p>
            <FaEnvelope /> {profile.email}
          </p>
          <p>
            <FaPhoneAlt /> {profile.phone}
          </p>
          <p>
            <FaMapMarkerAlt /> {profile.location}
          </p>
        </div>

        <motion.p
          className="profile-summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {profile.summary}
        </motion.p>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        className="resume-section"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2>💡 Skills</h2>
        <ul className="skills-list">
          {skills.map((skill, i) => (
            <li key={i}>
              <span className="skill-icon">{skill.icon}</span> {skill.name}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Projects Section */}
      <motion.div
        className="resume-section"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2>🚀 Projects</h2>
        {projects.map((p, i) => (
          <div key={i} className="project-item">
            <h3>
              <span className="project-icon">{p.icon}</span> {p.name}
            </h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </motion.div>

      <motion.div>
      {/* ✅ Permanent Google Drive Download Button */}
        <div className="download-section">
          <h3>📥 Download My Resume </h3>
          <a
            href="https://drive.google.com/drive/folders/1c0nRXbC3gFEUZ8yCSS7EU3VdyFNFHEHS"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
            
          >
            🔗 Download Resume from Drive
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Resume;
