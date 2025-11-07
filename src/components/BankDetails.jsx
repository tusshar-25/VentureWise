import React, { useState } from "react";
import AccountCard from "./AccountCard";

export default function BankDashboard({ user }) {
  const [showBalance, setShowBalance] = useState(false);

  if (!user) return <p className="login-warning">Please login first.</p>;

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name} 👋</h2>
      <p><strong>Account Number:</strong> {user.accNo}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>PIN:</strong> ****</p>
      <p>
        <strong>Balance:</strong>{" "}
        <span className={showBalance ? "balance show" : "balance"}>
          ₹ {user.balance.toLocaleString()}
        </span>
        <button onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? "Hide" : "Show"}
        </button>
      </p>

      <div className="account-sections">
        <AccountCard title="Savings Account" value={`₹ ${user.balance.toLocaleString()}`} />
        <AccountCard title="EMI & Loans" value="Available" />
        <AccountCard title="Credit Cards" value="3 Cards Active" />
        <AccountCard title="Discounts & Offers" value="View Offers" />
      </div>
    </div>
  );
}
