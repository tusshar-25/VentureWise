import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateAccountNo } from "../Utils/GenerateAcc.js";
import { generatePinFromNameDob } from "../Utils/Normalize.js";

export default function OpenAccount({ users, setUsers, setLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [occupation, setOccupation] = useState("");
  const [deposit, setDeposit] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleOpenAccount = (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    // Basic validations
    if (!username.trim() || !fullName.trim() || !dob || !mobile.trim() || !occupation.trim() || !deposit) {
      setError("Please fill in all fields.");
      return;
    }

    const exists = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );
    if (exists) {
      setError("Username already exists. Please choose another.");
      return;
    }

    // Validate mobile (10 digits typical)
    const mobileDigits = mobile.replace(/\D/g, "");
    if (mobileDigits.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Validate deposit minimum 10,000
    const depositAmt = Number(deposit);
    if (Number.isNaN(depositAmt) || depositAmt < 10000) {
      setError("Minimum opening deposit is ₹10,000.");
      return;
    }

    // Generate account number and PIN
    const accNo = generateAccountNo();
    const pin = generatePinFromNameDob(fullName, dob);

    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
      accNo,
      name: fullName,
      username,
      dob,
      pin,
      mobile: mobileDigits,
      occupation,
      balance: depositAmt,
    };
    setUsers([...users, newUser]);
    setSuccess(`Account created successfully! Your PIN is ${pin}. Please note it down safely.`);

    // Auto-login and navigate to user dashboard
    if (setLoggedInUser) {
      setLoggedInUser(newUser);
      navigate("/user");
    }

    // Reset form
    setUsername("");
    setFullName("");
    setDob("");
    setMobile("");
    setOccupation("");
    setDeposit("");
  };

  const features = [
    { title: "Instant Account", desc: "Create an account in minutes." },
    { title: "Welcome Bonus", desc: "Get a ₹500 bonus on new accounts." },
    { title: "24/7 Support", desc: "We are here to help you anytime." },
  ];

  return (
    <div className="page-container flex flex-col items-center gap-6 p-10">
      {/* Top row: Illustration + Form */}
      <div className="auth-top-row w-100 flex flex-row justify-center items-center gap-10 flex-wrap">
        {/* Left Illustration */}
        <div className="illustration flex-1 min-w-[300px] max-w-[450px]">
          <img src="/assets/open-an-account.svg" alt="Open Account Illustration" />
        </div>

        {/* Right Form */}
        <div className="flex flex-col gap-6 flex-1 min-w-[300px] max-w-[600px]">
          <form className="open-account" onSubmit={handleOpenAccount}>
            <h2>Open Account</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Opening Deposit (min ₹10,000)"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              min={10000}
              required
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Open Account</button>
            {success && <div className="success-message">{success}</div>}
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
