import React from "react";

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
        border: "none",
      }
    : {};

const getOpenModal = (open) => ({
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

export function Modal({ title, children }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("keydown", (e) => {
      console.log(e.key);
      e.key === "Escape" && setOpen(false);
    });
    return () => {
      window.removeEventListener("keydown");
    };
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        style={getModalButton()}
      >
        {title}
      </button>
      <div style={getModalBody(open)}>
        <div style={getOpenModal(open)}>
          <button style={getModalButton(!open)} onClick={() => setOpen(false)}>
            <svg width="40" height="40" viewbox="0 0 40 40">
              <path
                d="M 10,10 L 30,30 M 30,10 L 10,30"
                stroke="black"
                stroke-width="2"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
