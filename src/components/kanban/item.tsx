import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const ItemWrapper = styled.div`
  margin: 8px 0px;
  background: white;
  padding: 8px;
`;

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const Item = ({ id, label, index }) => {
  return (
    <Draggable key={id} draggableId={label} index={index}>
      {(provided, snapshot) => (
        <ItemWrapper
          ref={provided.innerRef}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          {...getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          {label}
        </ItemWrapper>
      )}
    </Draggable>
  );
};
