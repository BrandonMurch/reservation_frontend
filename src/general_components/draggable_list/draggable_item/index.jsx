import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const DraggableItem = React.memo(({
  item, index, getDisplay, styleSheet, onDrop: handleDrop, displayDroppable, setHovered,
}) => {
  const itemRef = useRef();
  const droppableRef = useRef();
  const onDragStart = (event) => {
    event.dataTransfer.setData('draggingFrom', index);
    setTimeout(() => {
      itemRef.current.style.display = 'none';
    }, 0);
  };

  const onDragEnter = (event) => {
    event.preventDefault();
    setHovered(index);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event) => {
    setHovered(-1);
    handleDrop(event, index);
  };

  return (
    <>
      <tr
        ref={droppableRef}
        className={displayDroppable ? styleSheet.activeDroppable : styleSheet.droppable}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
      <tr
        className={styleSheet.row}
        ref={itemRef}
        id={`table ${index}`}
        data-position={index}
        draggable
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
      >
        {getDisplay(item)}
      </tr>
    </>
  );
});

DraggableItem.propTypes = {
  item: PropTypes.shape({}),
  index: PropTypes.number.isRequired,
  getDisplay: PropTypes.func,
  onDrop: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  displayDroppable: PropTypes.bool.isRequired,
  styleSheet: PropTypes.shape({
    droppable: PropTypes.string.isRequired,
    activeDroppable: PropTypes.string.isRequired,
    row: PropTypes.string.isRequired,
  }).isRequired,
};

DraggableItem.defaultProps = {
  getDisplay: () => {},
  item: {},
};

export default DraggableItem;
