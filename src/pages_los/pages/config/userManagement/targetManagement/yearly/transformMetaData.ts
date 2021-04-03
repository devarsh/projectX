export const transformMetaData = (metadata, ownProducts) => {
  let fields = metadata?.fields;
  let crossMetadata: any = [];

  let ownProductsNew: any[] = [];
  if (Array.isArray(ownProducts) && ownProducts.length > 0) {
    ownProductsNew = ownProducts.flat().map((someValue) => {
      return someValue?.toLowerCase?.() + "Volume";
    });
  }

  let others = fields.filter((one) => {
    if (one.name.indexOf("Volume") >= 0) {
      return true;
    }
  });

  let othersName = others.map((name) => {
    return name?.name;
  });

  let myMetaData = othersName.filter(function (myNew) {
    if (ownProductsNew.indexOf(myNew) >= 0) {
      return true;
    } else {
      crossMetadata.push(myNew);
      return false;
    }
  });
  let myNewMetadata = fields.filter((one) => {
    if (myMetaData.indexOf(one.name) >= 0) {
      return true;
    }
  });
  let crosNewMetadata = fields.filter((one) => {
    if (crossMetadata.indexOf(one.name) >= 0) {
      return true;
    }
  });
  let otherData = fields.filter((one) => {
    if (
      myNewMetadata.indexOf(one) === -1 &&
      crosNewMetadata.indexOf(one) === -1
    ) {
      return true;
    }
  });

  var crossMetadataGroup = crosNewMetadata.map((someValue) => {
    someValue.render.group = 2;
    return someValue;
  });

  let finalFields: any = [
    ...myNewMetadata,
    ...crossMetadataGroup,
    ...otherData,
  ];
  let finalMetaData = {
    form: metadata?.form,
    fields: finalFields,
  };
  if (crosNewMetadata.length > 0) {
    finalMetaData.form.render.groups = {
      ...finalMetaData.form.render.groups,
      2: "Cross",
    };
  }
  return finalMetaData;
};
