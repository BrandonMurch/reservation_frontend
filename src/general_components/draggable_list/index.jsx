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
  items, Headers, updateList, DisplayComponent, styleSheet: style, getName, AddComponent,
}) {
  const [list, setList] = useState([...items]);
  const [hovered, setHovered] = useState(-1);

  const onDrop = useCallback((event, to) => {
    event.preventDefault();
    const from = event.dataTransfer.getData('draggingFrom');
    const newList = getReorderedList(list, from, to);
    setHovered(-1);
    setList(newList);
    updateList(newList);
  }, [list, updateList]);

  const EmptyDisplay = () => <div data-testid="endOfList" style={{ height: '2rem' }} />;

  const commonListProps = {
    styleSheet: style, onDrop, setHovered,
  };

  return (
    <div
      className={style.tableContainer}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const from = event.dataTransfer.getData('draggingFrom');
        unHideItem(from);
        setHovered(-1);
      }}
    >
      <div className={style.table}>
        <div>
          <Headers />
        </div>
        <ul className={style.list}>
          {
            list.map((item, index) => (
              <DraggableItem
                key={getName(item)}
                item={item}
                index={index}
                DisplayComponent={DisplayComponent}
                displayDroppable={hovered === index}
                {...commonListProps}
              />
            ))
        }
          <DraggableItem
            item={null}
            index={list.length}
            DisplayComponent={EmptyDisplay}
            displayDroppable={hovered === list.length}
            {...commonListProps}
          />
          <div className={style.row}>
            <AddComponent />
          </div>
        </ul>
      </div>
    </div>

  );
};

DraggableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  Headers: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  DisplayComponent: PropTypes.func.isRequired,
  getName: PropTypes.func,
  styleSheet: PropTypes.shape({
    tableContainer: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired,
    row: PropTypes.string.isRequired,
  }),
  AddComponent: PropTypes.func.isRequired,
};

DraggableList.defaultProps = {
  getName: (name) => name,
  styleSheet: {
    table: 'Table',
    row: 'Row',
    tableContainer: 'TableContainer',
  },
};

export default DraggableList;
