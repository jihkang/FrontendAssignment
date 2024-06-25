import React, { useState, useRef } from "react";
import { initData } from "../data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { filterObjectKeys } from "../utils";
import "../styles/columns.css";
import useDrag from "./hooks/useDrag";

const GRID = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: GRID,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  borderRadius: 4,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver, access) => ({
  background: access ? access : isDraggingOver ? "lightblue" : "lightgrey",
  padding: GRID,
});

const getDragStyle = (style) =>
  style === "grid"
    ? {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
      }
    : {
        display: "flex",
        flexDirection: "column",
      };

export function DropColumn({ onClick, items, currentColumn }) {
  return (
    <>
      {items[currentColumn].map((item, index) => (
        <Draggable
          draggableId={item.id}
          index={index}
          key={`dragged_columns_${currentColumn}_table_${item.id}`}
        >
          {(provided, snapshot) => (
            <>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
                className={`item 
                  ${
                    items.selected.some((citem) => citem.id === item.id)
                      ? "active"
                      : ""
                  }
                    `}
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
      ))}
    </>
  );
}

export function DragTitle({ column, length, children }) {
  return (
    <div style={getDragStyle("flex")}>
      <span>
        {column} {length}
      </span>
      {children}
    </div>
  );
}

export const DragForwardRef = React.forwardRef(
  ({ provided, snapshot, currentColumn, access, items, onClick }, ref) => {
    ref.current = { provided, snapshot, currentColumn };
    return (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
        className={access === currentColumn ? "invalid" : ""}
      >
        <DropColumn
          key={`Dropped_column_${currentColumn}_table`}
          items={items}
          onClick={onClick}
          currentColumn={currentColumn}
          access={access}
        />
        {provided.placeholder}
      </div>
    );
  }
);

export default function DragBody() {
  const dragedRef = useRef();
  const [access, setAccess] = useState();
  const [items, onDragEndSupport, onDragUpdateSupport, onClick] =
    useDrag(initData);

  const filterItems = filterObjectKeys(items, (key) => key !== "selected");
  const onDragEnd = (result) => {
    if (access) {
      alert("이접근은 유효하지 않습니다!");
      setAccess(null);
      return;
    }
    onDragEndSupport(result);
  };

  const onDragUpdate = (e) => {
    onDragUpdateSupport(e, setAccess);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <div className="grid">
        {filterItems.map((currentColumn) => (
          <DragTitle
            length={items[currentColumn].length}
            column={currentColumn}
            key={`dragged_columns_${currentColumn}_title`}
          >
            <Droppable
              droppableId={currentColumn}
              key={`droppabled_column_${currentColumn}`}
            >
              {(provided, snapshot) => (
                <DragForwardRef
                  ref={dragedRef}
                  provided={provided}
                  snapshot={snapshot}
                  currentColumn={currentColumn}
                  access={access}
                  items={items}
                  onClick={onClick}
                />
              )}
            </Droppable>
          </DragTitle>
        ))}
      </div>
    </DragDropContext>
  );
}
