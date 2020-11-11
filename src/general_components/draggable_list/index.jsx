// Dependencies
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Components
import DraggableItem from './draggable_item';

const unHideItem = (from) => {
  const table = document.getElementById(`table ${from}`);
  table.style.display = '';
};

const changeDraggedTo = function changeDraggedToAccountingForSplice(start, end) {
  if (start < end) {
    return end - 1;
  }
  return end;
};

const getReorderedList = (list, draggedFrom, draggedTo) => {
  const dragTo = changeDraggedTo(draggedFrom, draggedTo);
  const [selectedItem] = list.splice(draggedFrom, 1);
  return [...list.slice(0, dragTo), selectedItem, ...list.slice(dragTo)];
};

const DraggableList = function ListWithDraggableElementsToSort({
  items, headers, updateList, getDisplay, styleSheet,
}) {
  const [list, setList] = useState(items);
  const [hovered, setHovered] = useState(-1);

  const onDrop = useCallback((event, to) => {
    event.preventDefault();
    const from = event.dataTransfer.getData('draggingFrom');
    const newList = getReorderedList(list, from, to);
    setHovered(-1);
    setList(newList);
    updateList(newList);
  }, [list, updateList]);

  const getEmptyDisplay = useCallback(() => <td style={{ height: '2rem' }} />, []);

  return (
    <div
      className={styleSheet.tableContainer}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const from = event.dataTransfer.getData('draggingFrom');
        unHideItem(from);
        setHovered(-1);
      }}
    >
      <table className={styleSheet.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            list.map((item, index) => (
              <DraggableItem
                // TODO: Get keys for this
                item={item}
                index={index}
                getDisplay={getDisplay}
                styleSheet={styleSheet}
                onDrop={onDrop}
                displayDroppable={hovered === index}
                setHovered={setHovered}
              />
            ))
        }
          <DraggableItem
            item={null}
            index={items.length}
            getDisplay={getEmptyDisplay}
            styleSheet={styleSheet}
            onDrop={onDrop}
            displayDroppable={hovered === items.length}
            setHovered={setHovered}
          />
        </tbody>
      </table>
    </div>

  );
};

DraggableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateList: PropTypes.func.isRequired,
  getDisplay: PropTypes.func,
  styleSheet: PropTypes.shape({
    tableContainer: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired,
  }).isRequired,
};

DraggableList.defaultProps = {
  getDisplay: () => {},
};

export default DraggableList;
