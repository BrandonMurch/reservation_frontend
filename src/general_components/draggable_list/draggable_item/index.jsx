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
    setTimeout(() => {
      itemRef.current.style.display = 'none';
    }, 0);
  };

  const onDragEnter = (event) => {
    event.preventDefault();
    setHovered(index);
  };

  const onDragOver = (event) => {
    // Without preventDefault, drag and drop doesn't work.
    event.preventDefault();
  };

  const onDrop = (event) => {
    setHovered(-1);
    handleDrop(event, index);
  };

  return (
    <>
      <tr
        style={displayDroppable
          ? functionalStyle.activeDroppable
          : functionalStyle.droppable}
        className={styleSheet.droppable}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
      <tr
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
      </tr>
    </>
  );
});

DraggableItem.propTypes = {
  item: PropTypes.shape({}),
  index: PropTypes.number.isRequired,
  DisplayComponent: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  displayDroppable: PropTypes.bool.isRequired,
  styleSheet: PropTypes.shape({
    droppable: PropTypes.string.isRequired,
    row: PropTypes.string.isRequired,
  }).isRequired,
};

DraggableItem.defaultProps = {
  // getDisplay: () => {},
  item: {},
};

export default DraggableItem;
