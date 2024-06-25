import React from "react";
import "../styles/modal.css";

export function Modal({ children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className={!open? "close" : "none"}
      >
        <h2 className="modal-title">
          Read me
        </h2>
      </button>
      <div className={!open? "modal" : "modal show"} >
        <div className="modal-content">
          {children}
          <div className="footer">
            <button className={open? "close" : "none"} onClick={() => setOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
