import React from "react";
import { FaCoins } from "react-icons/fa";

export default function AccountCard({ title, value, icon }) {
  return (
    <div className="account-card">
      <div className="account-card-icon">{icon || <FaCoins />}</div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
