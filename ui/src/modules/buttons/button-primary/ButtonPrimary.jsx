import React from "react";
import "./ButtonPrimary.css";

const ButtonPrimary = ({ children, ...props }) => {
    return (
        <button className="button-primary" {...props}>
            {children}
        </button>
    );
};

export default ButtonPrimary;
