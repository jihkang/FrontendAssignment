export const getItems = (count) => {
  return Array.from({ length: count }, (_, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
    category: "column",
  }));
};

export function createUniqueArr(arr) {
  return Array.from(new Set(arr));
}

export const findCategoryIndex = (obj, category) => {
  return Object.keys(obj).findIndex((key) => key === category);
};

export const itemOrder = (items) => {
  return Object.keys(items).reduce((acc, key) => {
    if (key === "selected") {
      acc[key] = [];
      return acc;
    }
    acc[key] = items[key].filter(
      (item) => !items.selected.some((select) => select.id === item.id)
    );
    return acc;
  }, {});
};

export const multiReorder = (items, destination) => {
  const selectedItems = items.selected.map((item) => ({
    ...item,
    category: destination.droppableId,
  }));
  const newItems = itemOrder(items);
  newItems[destination.droppableId].splice(
    destination.index,
    0,
    ...selectedItems
  );
  console.log('multi order error');
  console.log(newItems);
  return newItems;
};

export const reorder = (items, source, destination) => {
  const newItems = itemOrder(items);
  console.log(newItems);
  /**
   * 
   * when selected multi items other and another item draged in here 
   * remove selected items error
   */
  const [removed] = newItems[source.droppableId].splice(source.index, 1);
  if (removed) {
    removed.category = destination.droppableId;
    newItems[destination.droppableId].splice(destination.index, 0, removed);
    return newItems;
  }
  console.log('reoreder error');
  console.log(newItems);
  return items;
};

export const getObjectKeys = (obj, key) => {
  if (!obj) return null;
  if (obj[key]) {
    return false;
  }
  return true;
};

export const validDragUpdate = (source, destination, startIndex, endIndex) => {
  if (
    (startIndex == 0 && endIndex == 2) ||
    (source.index % 2 === 1 && destination?.index % 2 === 1)
  ) {
    return false;
  }
  return true;
};

export const multiSelect = (items, item) => {
  const { selected } = items;
  if (selected.length < 1) {
    return [{ ...item }];
  }
  if (!item.category) {
    return selected;
  }
  const selectItem = selected[selected.length - 1];
  if (selectItem.category !== item.category) {
    return [{ ...item }];
  }
  const startIndex = items[item.category].findIndex(
    (cur) => cur.id === item.id
  );
  const endIndex = items[item.category].findIndex(
    (cur) => cur.id === selectItem.id
  );
  return items[item.category].filter((_, ind) =>
    startIndex < endIndex
      ? ind >= startIndex && ind <= endIndex
      : endIndex <= ind && ind <= startIndex
  );
};

export const filterObjectKeys = (obj, valid) => {
  return Object.keys(obj).filter(valid);
};
