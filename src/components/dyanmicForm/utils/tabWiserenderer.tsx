import {
  MetaDataType,
  TabWiseRenderedFieldsType,
  RenderedFieldsType,
} from "../types";
import { renderField } from "./fieldRenderer";

export const renderFieldsByTab = (metaData: MetaDataType) => {
  const { fields, form } = metaData;
  const defaultTab = -1;
  let tabWiseRenderer: TabWiseRenderedFieldsType = {};
  for (const oneField of fields) {
    let currentTabName = defaultTab;
    if (typeof form.render.tabs === "object") {
      currentTabName = form.render.tabs.hasOwnProperty(
        `${oneField.render?.tab}`
      )
        ? oneField.render?.tab ?? defaultTab
        : defaultTab;
    }
    const element = renderField(
      oneField,
      form?.render,
      form?.name,
      form?.componentProps
    );
    let currentTab: RenderedFieldsType;
    currentTab = tabWiseRenderer[currentTabName];
    if (currentTab === undefined) {
      currentTab = {
        fields: [],
        sequence: [],
        fieldNames: [],
      };
      tabWiseRenderer[currentTabName] = currentTab;
    }
    currentTab.fields.push(element);
    currentTab.sequence.push(oneField?.render?.sequence ?? 0);
    currentTab.fieldNames.push(oneField.name);
  }
  //sort them by sequence
  if (form.render.ordering === "sequence") {
    const tabs = Object.keys(tabWiseRenderer);
    for (const tab of tabs) {
      const currentTab = tabWiseRenderer[tab];
      //improve sorting
      for (let i = 0; i < currentTab.sequence.length; i++) {
        for (let j = i + 1; j < currentTab.sequence.length; j++) {
          if (currentTab.sequence[i] > currentTab.sequence[j]) {
            const temp = currentTab.sequence[j];
            currentTab.sequence[j] = currentTab.sequence[i];
            currentTab.sequence[i] = temp;
            const temp1 = currentTab.fields[j];
            currentTab.fields[j] = currentTab.fields[i];
            currentTab.fields[i] = temp1;
            const temp2 = currentTab.fieldNames[j];
            currentTab.fieldNames[j] = currentTab.fieldNames[i];
            currentTab.fieldNames[i] = temp2;
          }
        }
      }
    }
  }
  return tabWiseRenderer;
};
