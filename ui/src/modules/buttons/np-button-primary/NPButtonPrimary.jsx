import React from "react";
import "./NPButtonPrimary.css";

const NPButtonPrimary = ({ children, ...props }) => {
  return (
    <button className="np-button-primary" {...props}>
      {children}
    </button>
  );
};

export default NPButtonPrimary;
