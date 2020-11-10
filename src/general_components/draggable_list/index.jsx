// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import DraggableItem from './draggable_item';

const DraggableList = function ListWithDraggableElementsToSort({
  items, headers, updateList, getDisplay, styleSheet,
}) {
  const [list, setList] = useState(items);
  const onDrop = (event, to) => {
    const from = event.dataTransfer.getData('draggingFrom');
    event.preventDefault();
    const [selectedItem] = items.splice(from, 1);
    const newList = [...items.slice(0, to), selectedItem, ...items.slice(to)];
    setList(newList);
    updateList(newList);
  };
  return (
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
                updateList={updateList}
                onDrop={onDrop}
              />
            ))
        }
        <DraggableItem
          item={null}
          index={items.length}
          getDisplay={() => <td style={{ height: '2rem' }} />}
          styleSheet={styleSheet}
          onDrop={onDrop}
        />
      </tbody>
    </table>
  );
};

DraggableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateList: PropTypes.func.isRequired,
  getDisplay: PropTypes.func,
  styleSheet: PropTypes.shape({
    table: PropTypes.string.isRequired,
  }).isRequired,
};

DraggableList.defaultProps = {
  getDisplay: () => {},
};

export default DraggableList;
