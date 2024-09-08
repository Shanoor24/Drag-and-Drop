import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './DragAndDropList.module.css';

const ItemType = 'ITEM';

const DraggableItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li ref={(node) => ref(drop(node))} className={styles.item}>
      {item.content}
    </li>
  );
};

const DragAndDropList = () => {
  const [items, setItems] = useState([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
    { id: '4', content: 'Item 4' },
  ]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            moveItem={moveItem}
          />
        ))}
      </ul>
    </DndProvider>
  );
};

export default DragAndDropList;
