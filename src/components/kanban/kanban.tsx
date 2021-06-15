import { DragDropContext } from "react-beautiful-dnd";
import { Board } from "./board";
import { columns, data } from "./data";
import { splitTask } from "./utils";

let finalData = splitTask(data, "columnID", columns, "id");
console.log(finalData);

export const Kanban = () => {
  return (
    <DragDropContext>
      <Board data={finalData} />
    </DragDropContext>
  );
};
