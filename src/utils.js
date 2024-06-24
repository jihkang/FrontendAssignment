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

export const findCategoryIndex = (obj, category) => {
  return Object.keys(obj).findIndex((key) => key === category);
};


export const order = (items, callback) => {
  return Object.keys(items).reduce((acc, key) => {
    if (key === "selected") {
      acc[key] = callback(items, key);
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
  const newItems = order(items, (obj, key) => obj[key]);
  newItems[destination.droppableId].splice(
    destination.index,
    0,
    ...selectedItems
  );
  return newItems;
};
export const reorder = (items, source, destination) => {
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
  const [removed] = newItems[source.droppableId].splice(source.index, 1);
  removed.category = destination.droppableId;
  newItems[destination.droppableId].splice(destination.index, 0, removed);
  return newItems;
};

export const getObjectKeys = (obj, key) => {
  if (!obj) return null;
  if (obj[key]) {
    return false;
  }
  return true;
};

export const validChecker = (source, destination, startIndex, endIndex) => {
  if (
    (startIndex == 0 && endIndex == 2) ||
    (source.index % 2 === 1 && destination?.index % 2 === 1)
  ) {
    return false;
  }
  return true;
};

export const validCheckerFindMulti = (
  source,
  destination,
  startIndex,
  endIndex
) => {
  return;
};