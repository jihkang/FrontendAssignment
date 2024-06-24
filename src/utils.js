export const getItems = (count) => {
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
    category: "column",
  }));
};

/**
 * 
 * @param {*} items 
 * @param {*} destination 
 * @returns {
 * column: [],
 * ...
 * column4: [],
 * selected: [],
 * }
 * 
 */
export const multiReorder = (items, destination) => {
  const selectedItems = items.selected.map((item) => ({
    ...item,
    category: destination.droppableId,
  }));
  const newItems = Object.keys(items).reduce((acc, key) => {
    if (key === "selected") {
      acc[key] = items[key];
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
    ...selectedItems
  );
  return newItems;
};

export const reorder = (items, source, destination) => {
  const _items = JSON.parse(JSON.stringify(items));
  const [removed] = _items[source.droppableId].splice(source.index, 1);
  removed.category = destination.droppableId;
  _items[destination.droppableId].splice(destination.index, 0, removed);
  return _items;
};
