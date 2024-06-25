import React from "react";
import "../styles/modal.css";
const getModalBody = (open) =>
  open
    ? {
        zIndex: 100,
        position: "absolute",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.8)",
        width: "100vw",
        height: "100vh",
      }
    : {
        display: "none",
      };

const getModalButton = (open) =>
  !open
    ? {
        fontSize: "22px",
        borderRadius: "4px",
        background: "transparent",
        pading: 8,
        outline: 0,
        border: "1px solid",
        diplay: "block",
      }
    : {
        border: "none",
      };

const getOpenModal = () => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  padding: "20px",
  borderRadius: "4px",
  width: "50%",
  height: "50%",
  overflow: "auto",
  zIndex: 1000,
});

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
        Read me
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
