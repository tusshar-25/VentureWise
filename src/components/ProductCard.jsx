import React from "react";

export default function ProductCard({ title, desc, icon }) {
  return (
    <div className="product-card">
      {icon && <div className="product-card-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}