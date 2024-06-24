import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
      selected: false,
    }));

  const [items, setItems] = useState({
    column: getItems(10),
    column2: [],
    column3: [],
    column4: [],
  });

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
      const { destination, source } = result;
      setItems(reorder(source, destination));
    },
    [items]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {Object.keys(items).map((key) => (
          <Droppable droppableId={key} key={`droppabled_column_${key}`}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <span>{key}: column</span>
                {items[key].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
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
