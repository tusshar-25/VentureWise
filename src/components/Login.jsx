import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ users, setLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const features = [
    { title: "Secure Login", desc: "We protect your data with industry standard encryption." },
    { title: "Fast Access", desc: "Login quickly and manage your account efficiently." },
    { title: "Anytime Access", desc: "Access your account 24/7 from anywhere." },
  ];

  return (
    <div className="page-container flex flex-col items-center gap-6 p-10">
      {/* Top row: Illustration + Form */}
      <div className="auth-top-row w-100 flex flex-row justify-center items-center gap-10 flex-wrap">
        {/* Left Illustration */}
        <div className="illustration flex-1 min-w-[300px] max-w-[450px]">
          <img src="/assets/Mobile-login-bro.svg" alt="Login Illustration" />
        </div>

        {/* Right Form */}
        <div className="flex flex-col gap-6 flex-1 min-w-[300px] max-w-[600px]">
          <form
            className="open-account login-form"
            onSubmit={(e) => {
              e.preventDefault();
              const foundUser = users.find(
                (u) =>
                  u.username.toLowerCase() === username.trim().toLowerCase() &&
                  String(u.pin).toLowerCase() === pin.trim().toLowerCase()
              );
              if (foundUser) {
                setLoggedInUser(foundUser);
                setUsername("");
                setPin("");
                navigate("/user");
              } else {
                alert("Invalid username or PIN!");
              }
            }}
          >
            <h2>Login to SafeVault</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>

      {/* Full-width features row below */}
      <div className="auth-features-row one-line w-100">
        {features.map((f, idx) => (
          <div key={idx} className="feature-card">
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
