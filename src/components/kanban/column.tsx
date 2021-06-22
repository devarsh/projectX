import Typograhpy from "@material-ui/core/Typography";
import { Item } from "./item";
import { Droppable } from "react-beautiful-dnd";
import {
  ColumnWrapper,
  Heading,
  RoundedCount,
  ItemsContainer,
} from "./components";

export const Column = ({ columnID, label, items, ribbon, name, component }) => {
  return (
    <Droppable droppableId={`${columnID}`}>
      {(provided) => {
        return (
          <ColumnWrapper>
            <Heading>
              <RoundedCount>{items.length}</RoundedCount>
              <Typograhpy variant="subtitle2" style={{ paddingLeft: "8px" }}>
                {label}
              </Typograhpy>
            </Heading>
            <ItemsContainer
              {...provided.droppableProps}
              innerRef={provided.innerRef}
              ref={provided.innerRef}
            >
              {items.map((one, index) => (
                <Item
                  key={one.id}
                  index={index}
                  ribbon={ribbon}
                  columnName={name}
                  component={component}
                  {...one}
                />
              ))}
              {provided.placeholder}
            </ItemsContainer>
          </ColumnWrapper>
        );
      }}
    </Droppable>
  );
};
