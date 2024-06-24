import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { findCategoryIndex, getObjectKeys, validChecker } from "../utils";

const GRID = 8;

const getItemStyle = (isDragging, draggableStyle, isSelected) => ({
  userSelect: "none",
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? "lightgreen" : isSelected ? "green" : "grey",
  ...draggableStyle,
  borderRadius: 4,
});

const getListStyle = (isDraggingOver, bg) => {
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: GRID,
    width: 250,
    marginTop: 8,
    marginBottom: -4,
    minHeight: 32,
  };
  if (bg) {
    style.background = bg;
  }
  return style;
};

export function DropColumn({ item, index, onClick, items }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
              items.selected.some((citem) => citem.id === item.id)
            )}
            onClick={(e) => {
              onClick(e, item);
            }}
          >
            {item.content}
          </div>
          {provided.placeholder}
        </>
      )}
    </Draggable>
  );
}

export function DragTitle({ column, length, children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span>
        {column} {length}
      </span>
      {children}
    </div>
  );
}

export default function DragBody({ items, setItems, onDragEnd, onClick }) {
  const draged = React.useRef();
  const [bg, setBg] = React.useState({
    color: undefined,
    category: "",
  });

  return (
    <DragDropContext
      onDragEnd={(e) => {
        if (bg?.color) {
          alert("이접근은 유효하지 않습니다!");
          setBg(null);
          return;
        }
        onDragEnd(e);
      }}
      onDragUpdate={(e) => {
        const { source, destination } = e;
        if (!destination?.droppableId) return;
        const startIndex = findCategoryIndex(items, source.droppableId);
        const endIndex = findCategoryIndex(items, destination.droppableId);
        if (!validChecker(source, destination, startIndex, endIndex)) {
          setBg({
            color: "red",
            category: destination.droppableId,
          });
          return;
        }
        setBg(null);
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {Object.keys(items)
          .filter((key) => key !== "selected")
          .map((key) => (
            <DragTitle length={items[key].length} column={key}>
              <Droppable droppableId={key} key={`droppabled_column_${key}`}>
                {(provided, snapshot) => {
                  draged.current = { provided, snapshot, key };
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(
                        snapshot.isDraggingOver,
                        bg?.category === key ? bg.color : undefined
                      )}
                    >
                      <>
                        {provided.placeholder}
                        {items[key].map((item, index) => (
                          <DropColumn
                            key={`Dropped_column_${item.id}_table`}
                            item={item}
                            items={items}
                            index={index}
                            onClick={onClick}
                          />
                        ))}
                      </>
                    </div>
                  );
                }}
              </Droppable>
            </DragTitle>
          ))}
      </div>
    </DragDropContext>
  );
}
