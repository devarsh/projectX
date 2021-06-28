import Typograhpy from "@material-ui/core/Typography";
import { Item } from "./item";
import { Droppable } from "react-beautiful-dnd";
import {
  ColumnWrapper,
  Heading,
  RoundedCount,
  ItemsContainer,
} from "./components";

export const Column = ({
  itemsKey,
  columnID,
  refID,
  label,
  items,
  ribbon,
  name,
  query,
}) => {
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
                  key={one?.[itemsKey]}
                  id={one?.[itemsKey]}
                  index={index}
                  ribbon={ribbon}
                  columnName={name}
                  refID={refID}
                  query={query}
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
