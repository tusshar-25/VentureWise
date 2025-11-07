import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const messages = [
    "Secure banking. Trusted by thousands.",
    "Instant transfers with zero hidden fees.",
    "Your money, protected with bank‑grade security.",
    "Card controls: freeze, limit, and track in one tap.",
    "24/7 support. We’re here whenever you need us.",
    "Smart savings and high‑yield deposits.",
    "Fast bill payments and detailed e‑statements.",
  ];
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = messages[msgIndex];
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseAtFull = 1200;
    const pauseAtEmpty = 400;

    let timer;
    if (!isDeleting && displayText.length < fullText.length) {
      timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayText.length === fullText.length) {
      timer = setTimeout(() => setIsDeleting(true), pauseAtFull);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayText.length === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setMsgIndex((i) => (i + 1) % messages.length);
      }, pauseAtEmpty);
    }
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, msgIndex, messages]);

  return (
    <nav className="navbar">
      <div className="navbar-logo flex items-center gap-2">
        <img src="/assets/SafeVault.png" alt="VentureWise Logo" className="logo animated-logo"/>
        <span className="brand-name">VentureWise</span>
      </div>
      <div className="navbar-middle">
        <span className="navbar-rotating-msg">{displayText}</span>
      </div>
      <div className="navbar-links animated-nav">
        <Link to="/">Home</Link>
        {user && (
          <>
            <span
              className="profile-icon"
              title="Profile"
              onClick={() => navigate("/user")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/user'); }}
            >
              <FaUserCircle size={22} />
            </span>
            <button
              className="nav-logout-btn"
              onClick={() => {
                onLogout?.();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
