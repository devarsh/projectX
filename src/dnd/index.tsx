import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import DatePicker from "@material-ui/pickers/DatePicker";

export const A = "123";
// interface ControlStateType {
//   controlType: "textField" | "select" | "datePicker";
//   controlState: {
//     name: string;
//     label: string;
//   };
// }

// export const DNDGrid = () => {
//   const [gridState, setGridState] = useState<ControlStateType[]>([]);

//   return gridState.map((one) => {});
// };

// const GridRenderer = (row: ControlStateType, defaultGridSize) => {
//   switch (row.controlType) {
//     case "textField":
//       return (
//         <Grid item>
//           <TextField />
//         </Grid>
//       );
//     case "select":
//       return (
//         <Grid>
//           <Select />
//         </Grid>
//       );
//     case "datePicker":
//       return (
//         <Grid>
//           <DatePicker />
//         </Grid>
//       );
//   }
// };
