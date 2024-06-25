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
          맥에서는 cmd키를 윈도우에서는 ctrl키를 누른 후 선택하면 여러개를 선택할 수 있습니다.
          shift키를 누른후 선택하면 여러개를 한번에 선택할 수 있습니다.
          <br />
          제약사항: 1열에서 3열까지는 직접 접근할 수 없습니다. 
          <br />
          짝수번째 에서 짝수번째앞으로 접근할 수 없습니다
          (1,2,3,4,5,6,...10) 일때, 2번은 4번 6번 8번 10 번자리에 접근할 수 없습니다.
        </p>
      </Modal>
      <DragBody />
    </div>
  );
}
