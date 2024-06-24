import React, { useState, useCallback } from "react";
import DragBody from "./components/draggable";
import { initData } from "./data";
import { multiReorder, reorder } from "./utils";

export default function App() {
  const [items, setItems] = useState(initData);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination || result.REASON === "CANCEL") {
        setItems((prev) => ({ ...prev, selected: [] }));
        return;
      }
      const { draggableId, destination, source } = result;
      const newItems = items.selected.some(
        (select) => select.id === draggableId
      )
        ? multiReorder(items, destination)
        : reorder(items, source, destination);
      setItems(newItems);
    },
    [items]
  );

  const onClick = (e, item) => {
    if (e.metaKey || e.ctrlKey) {
      setItems((prev) => ({
        ...prev,
        selected: prev.selected.some((pitem) => item.id === pitem.id)
          ? prev.selected.filter((select) => select.id !== item.id)
          : [...prev.selected, item],
      }));
      return;
    }
    if (e.shiftKey && items.selected.length >= 1) {
      return;
    }
    setItems((prev) => ({ ...prev, selected: [item] }));
  };

  return (
    <div
      style={{
        height: "100px",
      }}
    >
      <h2>
        If you want to select multiple items, press the ctrl key and click
        <br></br>
        you use a mac, press the command key and click
      </h2>
      <DragBody onClick={onClick} onDragEnd={onDragEnd} items={items} />
    </div>
  );
}
