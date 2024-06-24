import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));

  const [items, setItems] = useState({
    column: getItems(10),
    column2: [],
    column3: [],
    column4: [],
    selected: [],
  });

  const multiReorder = (source, destination) => {
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
    _items[destination.droppableId].splice(destination.index, 0, removed);
    return _items;
  };

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }
      const { draggableId, destination, source } = result;
      setItems(
        items.selected.some((select) => select.id === draggableId)
          ? multiReorder(source, destination)
          : reorder(source, destination)
      );
    },
    [items]
  );

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
        {items.selected.map((item) => item.content).join(", ")}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {Object.keys(items)
            .filter((key) => key !== "selected")
            .map((key) => (
              <Droppable droppableId={key} key={`droppabled_column_${key}`}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    <div>
                      <span>{key} </span>
                    </div>
                    {items[key].map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              item.selected
                            )}
                            onClick={() => {
                              setItems((prev) => ({
                                ...prev,
                                selected: prev.selected.includes(item)
                                  ? prev.selected.filter(
                                      (select) => select.id !== item.id
                                    )
                                  : [...prev.selected, item],
                              }));
                            }}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            ))}
        </div>
      </DragDropContext>
    </>
  );
}

const GRID = 8;

const getItemStyle = (isDragging, draggableStyle, isSelected) => ({
  userSelect: "none",
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? "lightgreen" : isSelected ? "green" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: GRID,
  width: 250,
});

ReactDOM.render(<App />, document.getElementById("root"));
