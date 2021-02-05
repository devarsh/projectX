import { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "components/dataTableStatic";
import metaData from "./metaData";
import { ActionTypes } from "components/dataTable/types";
import makeData from "./makeData";
import { Dialog } from "@material-ui/core";

const actions: ActionTypes[] = [
  {
    actionName: "uploadDocs",
    actionLabel: "Add Documents",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const GridTable = () => {
  //const data = useMemo(() => makeData(20), []);
  const [data, setData] = useState<any>([]);
  const [action, setAction] = useState<any>(null);

  const addData = () => {
    let result = makeData(1);
    setData((old) => [...old, ...result]);
  };
  const handleDialogClose = () => {
    setAction(null);
  };

  return (
    <Fragment>
      <Button onClick={addData}>AddData</Button>
      <Grid
        finalMetaData={metaData}
        data={data}
        setData={setData}
        actions={actions}
        setAction={setAction}
      />
      <Dialog
        open={action !== null}
        onClose={handleDialogClose}
        key={"dialog"}
      ></Dialog>
    </Fragment>
  );
};
