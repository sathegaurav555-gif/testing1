import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

function Login({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) onLoginSuccess();
  }, [onLoginSuccess]);

  // ✅ Email format check (simple regex)
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Basic Input Validation
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address!");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    if (isSignup) {
      if (form.password !== form.confirm) {
        setError("Passwords do not match!");
        return;
      }
      alert("Account created successfully! Please login.");
      setIsSignup(false);
      setForm({ email: "", password: "", confirm: "" });
      setError("");
    } else {
      if (form.email === "intern@demo.com" && form.password === "pass123") {
  localStorage.setItem("user", form.email);
  onLoginSuccess();  // ✅ redirects to Resume
} else {
        setError("Invalid email or password!");
      }
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (resetEmail.trim() === "") {
      setResetMsg("Please enter your email.");
      return;
    }
    if (!isValidEmail(resetEmail)) {
      setResetMsg("Please enter a valid email address.");
      return;
    }
    setResetMsg("Password reset link has been sent to your email!");
    setTimeout(() => setShowForgot(false), 2000);
  };

  return (
    <div className="login-container">
      {/* Background Blur + Login Card */}
      <motion.div
        className="login-form"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* User Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="icon-wrapper"
        >
          <FaUserCircle className="user-icon" />
        </motion.div>

        {/* Title */}
        <motion.h2
          key={isSignup ? "signup" : "login"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="form-title"
        >
          {isSignup ? "Create Account" : "Login"}
        </motion.h2>

        {/* Login / Signup Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={isSignup ? "signup-form" : "login-form"}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: isSignup ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isSignup ? -50 : 50 }}
            transition={{ duration: 0.5 }}
          >
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <div style={{ position: "relative" }}>
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password for Signup */}
            {isSignup && (
              <motion.input
                className="login-input"
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                required
              />
            )}

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-button">
              {isSignup ? "Sign Up" : "Login"}
            </button>

            {!isSignup && (
              <p className="forgot-text" onClick={() => setShowForgot(true)}>
                Forgot Password?
              </p>
            )}

            {!isSignup && (
              <p className="demo-info">Demo: intern@demo.com / pass123</p>
            )}
          </motion.form>
        </AnimatePresence>

        {/* Toggle Login/Signup */}
        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgot && (
          <>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowForgot(false)}
            />
            <motion.div
              className="forgot-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3>Reset Password</h3>
              <form onSubmit={handleReset}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="login-input"
                />
                {resetMsg && <p className="reset-msg">{resetMsg}</p>}
                <div className="modal-buttons">
                  <button type="submit" className="login-button small">
                    Send Link
                  </button>
                  <button
                    type="button"
                    className="login-button cancel small"
                    onClick={() => setShowForgot(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
