import styled from "styled-components";
import { Item } from "./item";
import { Droppable } from "react-beautiful-dnd";

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 8px;
`;

const Label = styled.div`
  font-weight: 500;
  padding: 8px;
  background: #6e3545;
  border-radius: 5px;
  width: 100%;
  color: white;
`;

const grid = 8;

const getColumnStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

export const Column = ({ id, label, items }) => {
  return (
    <Droppable droppableId={`${id}`}>
      {(provided, snapshot) => (
        <ColumnWrapper
          {...provided.droppableProps}
          innerRef={provided.innerRef}
          ref={provided.innerRef}
          style={getColumnStyle(snapshot.isDraggingOver)}
        >
          <Label>{label}</Label>
          {items.map((one, index) => (
            <Item key={one.id} index={index} {...one} />
          ))}
        </ColumnWrapper>
      )}
    </Droppable>
  );
};
