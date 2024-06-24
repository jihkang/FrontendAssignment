import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

export function DropColumn({ item, index, onClick, items }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
            items.selected.includes(item)
          )}
          onClick={(e) => {
            onClick(e, item);
          }}
        >
          {item.content}
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}

export default function DragBody({ items, onDragEnd, onClick }) {
  return (
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
                    <span>
                      {key} {provided.placeholder}
                    </span>
                  </div>
                  {items[key].map((item, index) => (
                    <DropColumn
                      key={`Dropped_column_${item.id}`}
                      item={item}
                      items={items}
                      index={index}
                      onClick={onClick}
                    />
                  ))}
                </div>
              )}
            </Droppable>
          ))}
      </div>
    </DragDropContext>
  );
}
