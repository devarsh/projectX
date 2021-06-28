import { Draggable } from "react-beautiful-dnd";
import ItemHolder from "assets/images/itemHolder.svg";
import { Card } from "./card";

import { ItemWrapper, ItemDragger, ItemRibbon } from "./components";

export const Item = ({
  id,
  refID,
  index,
  ribbon,
  columnName,
  query,
  ...others
}) => {
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => {
        return (
          <ItemWrapper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ItemDragger>
              <img src={ItemHolder} alt="holder" />
            </ItemDragger>
            {/*@ts-ignore*/}
            <Card
              columnName={columnName}
              id={id}
              refID={refID}
              query={query}
              {...others}
            />
            <ItemRibbon color={ribbon} />
          </ItemWrapper>
        );
      }}
    </Draggable>
  );
};
