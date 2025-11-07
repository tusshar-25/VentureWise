import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserPage({ users, loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `SafeVault | ${loggedInUser ? 'Dashboard' : 'Login required'}`;
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.setAttribute('href', '/logo.png');
    }
  }, [loggedInUser]);

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate("/");
  };

  const userFeatures = [
    { title: "Quick Transfer", desc: "Send money instantly to saved contacts." },
    { title: "Bill Payments", desc: "Pay utility bills in one tap." },
    { title: "e-Statements", desc: "Download monthly statements securely." },
    { title: "Card Controls", desc: "Manage limits and freeze/unfreeze cards." },
  ];

  return (
    <div className="user-page">
      {!loggedInUser ? (
        <div className="login-form" style={{ textAlign: "center" }}>
          <h2>You are not logged in</h2>
          <p>Please <Link to="/login">login here</Link> to access your dashboard.</p>
        </div>
      ) : (
        <div className="logged-in">
          <div className="dashboard">
            <h2 className="dashboard-title">Welcome, {loggedInUser.name} 👋</h2>
            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-label">Account Number</div>
                <div className="detail-value">{loggedInUser.accNo}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Username</div>
                <div className="detail-value">{loggedInUser.username}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">PIN</div>
                <div className="detail-value">**** (hidden)</div>
              </div>
              <div className="detail-item emphasis">
                <div className="detail-label">Balance</div>
                <div className="detail-value">₹ {loggedInUser.balance.toLocaleString()}</div>
              </div>
            </div>

            {/* Logged-in features */}
            <div className="auth-features-row one-line w-100 user-features">
              {userFeatures.map((f, idx) => (
                <div key={idx} className="feature-card">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Illustrations strip */}
            <div className="row justify-content-center align-items-center g-3 mt-4">
              {[
                "/assets/undraw_finance_m6vw.svg",
                "/assets/undraw_online-payments_p97e.svg",
                "/assets/undraw_savings_uwjn.svg",
                "/assets/undraw_send-money_4qc7.svg",
                "/assets/undraw_credit-card_t6qm.svg",
              ].map((src, idx) => (
                <div key={idx} className="col-6 col-md-2 d-flex justify-content-center">
                  <img src={src} alt={`Illustration ${idx+1}`} style={{ maxHeight: 110 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}