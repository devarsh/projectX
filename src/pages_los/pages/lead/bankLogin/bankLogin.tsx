import { Kanban } from "./kanban";
import { columns } from "./metaData/kanbanMetaData";

export const BankLogin = (props) => {
  return (
    <Kanban
      columns={columns}
      filterBy={["bankName", "branchName", "stageName", "subStageName"]}
      splitItemsBy="statusCode" //items contaning column ID
      itemsKey="branchID" //unique Id for each item
      itemsPriorityKey="priority" //for sorting items
      {...props}
    />
  );
};
