import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FileUploadControl } from "./fileControl";

const Index = () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <FileUploadControl docLabel="Pan Card" docType="pan" />
      </DndProvider>
    </div>
  );
};

export default Index;
