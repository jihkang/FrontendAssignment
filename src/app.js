import React, { useState, useCallback } from "react";
import DragBody from "./components/draggable";
import { initData } from "./data";
import { multiReorder, reorder, createUniqueArr, multiSelect } from "./utils";
import { Modal } from "./components/modal";

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
        selected: items.selected.some((citem) => item.id === citem.id)
          ? items.selected.filter((select) => select.id !== item.id)
          : createUniqueArr([...prev.selected, item]),
      }));
      return;
    }
    if (e.shiftKey) {
      const newSelected = multiSelect(items, item);
      setItems({
        ...items,
        selected: newSelected,
      });
      return;
    }
    if (items.selected.length >= 1) {
      setItems((prev) => ({ ...prev, selected: [] }));
      return;
    }
  };

  return (
    <div>
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
      <DragBody
        onClick={onClick}
        onDragEnd={onDragEnd}
        items={items}
        setItems={setItems}
      />
    </div>
  );
}
