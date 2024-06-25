import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { filterObjectKeys, findCategoryIndex, validChecker } from "../utils";

const GRID = 8;

const getItemStyle = (isDragging, draggableStyle, isSelected) => ({
  userSelect: "none",
  padding: GRID,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? "lightgreen" : isSelected ? "green" : "grey",
  borderRadius: 4,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver, bg) => ({
  background: bg ? bg : isDraggingOver ? "lightblue" : "lightgrey",
  padding: GRID,
  width: 250,
  maxWidth: 250,
  margin: "15px 40px",
  minHeight: "80px",
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
  console.log(currentColumn);
  console.log(items[currentColumn]);
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
  ({ provided, snapshot, currentColumn, bg, items, onClick }, ref) => {
    ref.current = { provided, snapshot, currentColumn };
    return (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={getListStyle(
          snapshot.isDraggingOver,
          bg?.category === currentColumn ? bg.color : undefined
        )}
      >
        <DropColumn
          key={`Dropped_column_${currentColumn}_table`}
          items={items}
          onClick={onClick}
          currentColumn={currentColumn}
        />
        {provided.placeholder}
      </div>
    );
  }
);

export default function DragBody({
  items,
  onDragEnd: onDragEndParent,
  onClick,
}) {
  const dragedRef = React.useRef();
  const [bg, setBg] = React.useState({
    color: undefined,
    category: "",
  });

  const filterItems = filterObjectKeys(items, (key) => key !== "selected");

  const onDragEnd = (e) => {
    if (bg?.color) {
      alert("이접근은 유효하지 않습니다!");
      setBg(null);
      return;
    }
    onDragEndParent(e);
  };

  const onDragUpdate = (e) => {
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <div style={getDragStyle("grid")}>
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
                  bg={bg}
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
