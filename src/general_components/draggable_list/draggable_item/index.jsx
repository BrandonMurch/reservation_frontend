import React, { createRef, useRef } from 'react';
import PropTypes from 'prop-types';

const DraggableItem = function ItemInDraggableList({
  item, index, getDisplay, styleSheet, onDrop,
}) {
  const itemRef = createRef();
  const droppableRef = createRef();
  const to = useRef();
  const onDragStart = (event) => {
    event.dataTransfer.setData('draggingFrom', event.currentTarget.dataset.position);
    setTimeout(() => {
      itemRef.current.style.display = 'none';
    }, 0);
  };
  const onDragEnter = (event) => {
    // TODO: can this be done in a purely CSS way? Only show when hovered?
    droppableRef.current.style.display = 'block';
    to.current = event.currentTarget.dataset.position;
  };

  const onDragLeave = () => {
    droppableRef.current.style.display = 'none';
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <tr
        className={styleSheet.droppable}
        ref={droppableRef}
        onDragOver={onDragOver}
        onDrop={(event) => {
          onDrop(event, to.current);
        }}
        onDragLeave={onDragLeave}
        onMouseleave={onDragLeave}
      />
      <tr
        className={styleSheet.row}
        ref={itemRef}
        data-position={index}
        draggable
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onMouseleave={onDragLeave}
      >
        {getDisplay(item)}
      </tr>

    </>

  );
};

DraggableItem.propTypes = {
  item: PropTypes.shape({}),
  index: PropTypes.number.isRequired,
  getDisplay: PropTypes.func,
  onDrop: PropTypes.func.isRequired,
  styleSheet: PropTypes.shape({
    droppable: PropTypes.string.isRequired,
    row: PropTypes.string.isRequired,
  }).isRequired,
};

DraggableItem.defaultProps = {
  getDisplay: () => {},
  item: {},
};

export default DraggableItem;
