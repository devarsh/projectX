import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Board } from "./board";
import { columns, data } from "./data";
import { splitTask } from "./utils";

export const Kanban = () => {
  const [state, setState] = useState(data);

  return (
    <DragDropContext
      onDragStart={(result) => {}}
      onDragEnd={(result) => {
        let newState = state.map((one) => {
          if (one.label === result.draggableId) {
            return {
              ...one,
              columnID: result?.destination?.droppableId,
              loading: true,
            };
          }
          return one;
        });
        setState(newState);
      }}
    >
      <Board data={splitTask(state, "columnID", columns, "id")} />
    </DragDropContext>
  );
};
