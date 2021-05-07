import { MetaDataType } from "components/dyanmicForm";

export const transformMetaData = (
  metaData: MetaDataType,
  ownProducts: string[] = []
) => {
  let fields = metaData?.fields ?? [];

  let allProducts = fields
    .filter((one) => {
      if (one.name.indexOf("Volume") >= 0) {
        return true;
      }
      return false;
    })
    .map((one) => one?.name ?? "");

  if (Array.isArray(ownProducts) && ownProducts.length > 0) {
    ownProducts = ownProducts.map((product) => {
      return product?.toLowerCase?.() + "Volume";
    });
  }

  let crossProducts = allProducts.filter((currentProduct) =>
    ownProducts.indexOf(currentProduct) < 0 ? true : false
  );

  console.log(allProducts, crossProducts, ownProducts);

  let otherFields = fields.filter((one) =>
    allProducts.indexOf(one.name) < 0 ? true : false
  );

  let ownFields = fields.filter((one) =>
    ownProducts.indexOf(one.name) >= 0 ? true : false
  );
  let crossFields = fields.filter((one) =>
    crossProducts.indexOf(one.name) >= 0 ? true : false
  );

  if (crossFields.length > 0) {
    crossFields.map((one) => (one.render.group = 1));
    otherFields.map((one) => {
      if (one.render.group === 1) {
        one.render.group = 2;
      }
      return one;
    });
  }
  const allFields = [...otherFields, ...ownFields, ...crossFields];
  if (crossFields.length > 0) {
    metaData.form.render.groups = {
      0: "Business By Direct Team",
      1: "Cross Products",
      2: "Lead Target",
    };
    return {
      form: metaData?.form,
      fields: allFields,
    };
  } else {
    return {
      form: metaData?.form,
      fields: allFields,
    };
  }
};
