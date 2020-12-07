// Dependencies
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import functionalStyle from '../functional_style';

const DraggableItem = React.memo(({
  item, index, DisplayComponent, styleSheet, onDrop: handleDrop, displayDroppable, setHovered,
}) => {
  const itemRef = useRef();
  const onDragStart = (event) => {
    event.dataTransfer.setData('draggingFrom', index);
    event.dataTransfer.setData('item', JSON.stringify(item));
    setTimeout(() => {
      itemRef.current.style.display = 'none';
    }, 0);
  };

  const onDragEnter = (event) => {
    event.preventDefault();
    setHovered(index);
  };

  const onDragOver = (event) => {
    // Without preventDefault, drag and drop doesn't work. The default action is to cancel the drag
    event.preventDefault();
  };

  const onDrop = (event) => {
    setHovered(-1);
    handleDrop(event, index);
  };

  return (
    <>
      <li
        style={displayDroppable
          ? functionalStyle.activeDroppable
          : functionalStyle.droppable}
        className={styleSheet.droppable}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
      <li
        className={styleSheet.row}
        style={functionalStyle.row}
        ref={itemRef}
        id={`table ${index}`}
        data-position={index}
        draggable
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
      >
        <DisplayComponent item={item} />
      </li>
    </>
  );
});

DraggableItem.propTypes = {
  item: PropTypes.shape({}),
  index: PropTypes.number.isRequired,
  DisplayComponent: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  displayDroppable: PropTypes.bool,
  styleSheet: PropTypes.shape({
    droppable: PropTypes.string,
    row: PropTypes.string,
  }),
};

DraggableItem.defaultProps = {
  displayDroppable: false,
  item: {},
  styleSheet: {
    droppable: 'droppable',
    row: 'row',
  },
};

export default DraggableItem;
