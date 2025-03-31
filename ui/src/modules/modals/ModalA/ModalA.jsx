import React from "react";
import "./ModalA.css";

import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";

const ModalA = ({ children, closeModal }) => {
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <div className="np-modal-a-backdrop" onClick={closeModal}>
      <div className="np-modal-a-window" onClick={(e) => e.stopPropagation()}>
        <button
          className="no-style clickable np-modal-a-close-btn"
          onClick={closeModal}
        >
          {<IoMdClose size="30px" />}
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalA;
