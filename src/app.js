import React from "react";
import DragBody from "./components/draggable";

import { Modal } from "./components/modal";
import "./styles/global.css";
import "./styles/main.css";

export default function App() {
  return (
    <div className="main">
      <Modal title="How to use">
        <p>
          If you want to select multiple items, press the ctrl key and click you
          use a mac, press the command key and click
          <br /> If you want to select multiple items, press the shift key and
          click
        </p>
        <p>if you access 1st column to 3rd column cannot access directly</p>
        <p>if you access even number to even number cannot access directly</p>
      </Modal>
      <DragBody />
    </div>
  );
}
