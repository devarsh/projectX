import { MetaDataType } from "components/dyanmicForm";

const oldToNew = {
  getPincodeDtl: "getPincodeDtlEdit",
  getLocationDtl: "getLocationDtlEdit",
  getcoApplicantPincodeDtl: "getcoApplicantPincodeDtlEdit",
  getcoApplicantLocationDtl: "getcoApplicantLocationDtlEdit",
  getSitePincodeDtl: "getSitePincodeDtlEdit",
  getSiteLocationDtl: "getSiteLocationDtlEdit",
};

export const transformMetaDataForEdit = (metaData: MetaDataType) => {
  const newFields = metaData.fields.map((one) => {
    if (
      //@ts-ignore
      typeof one.postValidationSetCrossFieldValues === "string" &&
      //@ts-ignore
      one.postValidationSetCrossFieldValues !== ""
    ) {
      //@ts-ignore
      one.postValidationSetCrossFieldValues =
        //@ts-ignore
        oldToNew[one.postValidationSetCrossFieldValues] ??
        //@ts-ignore
        one.postValidationSetCrossFieldValues;
    }
    return one;
  });
  metaData.form.label = `${metaData.form.label} Edit Mode`;
  metaData.form.render.renderType = "tabs";
  return {
    form: metaData.form,
    fields: newFields,
  };
};
