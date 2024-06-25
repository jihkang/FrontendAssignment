import { useCallback, useState } from "react";
import {
  createUniqueArr,
  findCategoryIndex,
  multiReorder,
  multiSelect,
  reorder,
  validDragUpdate,
} from "../../utils";

/**
 *
 * @returns [items: [], onDragEnd: (result) => void; , onDragUpdate, onClick]
 *
 * @return_param items
 *  item []
 * @return_params onDragEnd
 *  (result:{destination: , reason: string} ) => void;
 *
 */
export default function useDrag(initData) {
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
      if (newItems && items.selected.length > 1) {
        setItems(multiReorder(items, destination));
        return ;
      }
      if (!newItems && items.selected.length > 1) {
        setItems(reorder(Object.assign(items, {selected: []}), source, destination));
        return ;
      }
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

  const onDragUpdate = (e, callback) => {
    const { source, destination } = e;
    if (!destination?.droppableId) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    const startIndex = findCategoryIndex(items, source.droppableId);
    const endIndex = findCategoryIndex(items, destination.droppableId);
    if (!validDragUpdate(source, destination, startIndex, endIndex)) {
      callback(destination.droppableId);
      return;
    }
    callback(null);
  };
  return [items, onDragEnd, onDragUpdate, onClick];
}
