import { MetaDataType } from "components/dyanmicForm";

export const transformMetaData = (metaData: MetaDataType) => {
  metaData.form.render.renderType = "tabs";
  return metaData;
};
