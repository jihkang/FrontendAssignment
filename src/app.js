import React from "react";
import DragBody from "./components/draggable";
import { Modal } from "./components/modal";
import "./styles/global.css";
import "./styles/main.css";

export default function App() {
  return (
    <div className="main">
      <Modal>
        <div className="readme">
          <h3>
            어떻게 사용하나요?
          </h3>
            <p>
              맥에서는 cmd키를 윈도우에서는 ctrl키를 누른 후 선택하면 여러개를
              선택할 수 있습니다.
            </p>
          <h3>
            제약사항
          </h3>
            <p>
              1열에서 3열까지는 직접 접근할 수 없습니다.
              <br />
              짝수번째 에서 짝수번째 앞으로 접근할 수 없습니다<i>(1,2,3,4,5,6,...10)일 때,</i>
              <br/> 2번은 4번 6번 8번 10번 자리에 접근할 수 없습니다.
            </p>
        </div>
      </Modal>
      <DragBody />
    </div>
  );
}
