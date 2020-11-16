// Dependencies
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import functionalStyle from './functional_style';

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
  items, headers, updateList, DisplayComponent, styleSheet, getName,
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

  const EmptyDisplay = () => <td style={{ height: '2rem' }} />;

  const commonListProps = {
    styleSheet, onDrop, setHovered,
  };

  return (
    <div
      style={functionalStyle.tableContainer}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const from = event.dataTransfer.getData('draggingFrom');
        unHideItem(from);
        setHovered(-1);
      }}
    >
      <table style={functionalStyle.table}>
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
            index={items.length}
            DisplayComponent={EmptyDisplay}
            displayDroppable={hovered === items.length}
            {...commonListProps}
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
  DisplayComponent: PropTypes.func.isRequired,
  getName: PropTypes.func,
  styleSheet: PropTypes.shape({}).isRequired,
};

DraggableList.defaultProps = {
  getName: (name) => name,
};

export default DraggableList;
