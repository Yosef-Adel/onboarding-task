import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button
    style={{ padding: "0.5rem 1rem", background: "#333", color: "#fff" }}
    onClick={onClick}
  >
    {children}
  </button>
);

