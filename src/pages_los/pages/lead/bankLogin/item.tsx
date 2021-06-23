import { Draggable } from "react-beautiful-dnd";
import ItemHolder from "assets/images/itemHolder.svg";
import { createElement } from "react";
import { isValidElementType } from "react-is";

import { ItemWrapper, ItemDragger, ItemRibbon } from "./components";

export const Item = ({
  id,
  index,
  ribbon,
  component,
  columnName,
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
            {isValidElementType(component)
              ? createElement(component, { columnName, id, ...others }, null)
              : null}
            <ItemRibbon color={ribbon} />
          </ItemWrapper>
        );
      }}
    </Draggable>
  );
};
