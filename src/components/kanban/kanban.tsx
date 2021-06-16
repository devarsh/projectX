import { DragDropContext } from "react-beautiful-dnd";
import { Board } from "./board";
import { columns, data } from "./data";
import { splitTask } from "./utils";

let finalData = splitTask(data, "columnID", columns, "id");

export const Kanban = () => {
  return (
    <DragDropContext
      onDragEnd={(result) => {
        console.log(result);
      }}
    >
      <Board data={finalData} />
    </DragDropContext>
  );
};
