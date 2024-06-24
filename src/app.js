import React, { useState, useCallback } from "react";
import DragBody from "./components/draggable";
import { initData } from "./data";

export default function App() {
  const [items, setItems] = useState(initData);

  const multiReorder = (destination) => {
    const newItems = Object.keys(items).reduce((acc, key) => {
      if (key === "selected") {
        acc[key] = [];
        return acc;
      }
      acc[key] = items[key].filter(
        (item) => !items.selected.some((select) => select.id === item.id)
      );
      return acc;
    }, {});
    newItems[destination.droppableId].splice(
      destination.index,
      0,
      ...items.selected
    );
    return newItems;
  };

  const reorder = (source, destination) => {
    const _items = JSON.parse(JSON.stringify(items));
    const [removed] = _items[source.droppableId].splice(source.index, 1);
    removed.category = destination.droppableId;
    _items[destination.droppableId].splice(destination.index, 0, removed);

    return _items;
  };

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination || result.REASON === "CANCEL") {
        setItems((prev) => ({ ...prev, selected: [] }));
        return;
      }
      const { draggableId, destination, source } = result;
      setItems(
        items.selected.some((select) => select.id === draggableId)
          ? multiReorder(destination)
          : reorder(source, destination)
      );
    },
    [items]
  );

  const onClick = (e, item) => {
    if (e.metaKey || e.ctrlKey) {
      setItems((prev) => ({
        ...prev,
        selected: prev.selected.includes(item)
          ? prev.selected.filter((select) => select.id !== item.id)
          : [...prev.selected, item],
      }));
      return;
    }
    if (e.shiftKey && items.selected.length >= 1) {
      console.log(items.selected);
      return;
    }
    setItems((prev) => ({ ...prev, selected: [item] }));
  };

  return (
    <>
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
    </>
  );
}
