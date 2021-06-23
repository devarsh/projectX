import { Fragment, useState } from "react";
import { Column } from "./column";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { SearchBar } from "components/derived/search";
import { BoardContainer } from "./components";
import Button from "@material-ui/core/Button";
import { Filter } from "./filter";

export const Board = ({ data }) => {
  const [search, setSearch] = useState("");
  return (
    <Fragment>
      <Toolbar
        variant="dense"
        disableGutters
        style={{ marginLeft: "8px", marginRight: "8px" }}
      >
        <Typography component="div" variant="h6">
          Bank Login
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <SearchBar
          margin={"none"}
          placeholder="Search Bank"
          style={{ marginLeft: "8px", marginRight: "8px" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained">Sancation</Button>
      </Toolbar>
      <BoardContainer>
        <Filter data={data} filterValue={search}>
          {(filteredData) => (
            <>
              {filteredData.map((one) => (
                <Column key={one.columnID} {...one} />
              ))}
            </>
          )}
        </Filter>
      </BoardContainer>
    </Fragment>
  );
};
