import RetailLoanMetaData from "meta/retailsLoan";
import {
  SelEmpDevQueMetaData,
  SelfEmpBusQueMetaData,
  SelfEmpProfQuesMetaData,
  salariedPersonMetadata,
} from "meta/NewHomeLoanQuestionsMetadata";

export const chooseNaviagtionPath = (
  productType: string,
  profession: string
) => {
  let metaData;

  switch (`${productType}/${profession ?? ""}`) {
    case "12300001/":
      RetailLoanMetaData.form.label = "Retail home Loan";
      RetailLoanMetaData.form.name = productType;
      metaData = { ...RetailLoanMetaData };
      break;
    case "12300002/":
      RetailLoanMetaData.form.label = "Retail LAP";
      RetailLoanMetaData.form.name = productType;
      metaData = { ...RetailLoanMetaData };
      break;
    case "12300003/":
      RetailLoanMetaData.form.label = "Retail LRD";
      RetailLoanMetaData.form.name = productType;
      metaData = { ...RetailLoanMetaData };
      break;
    case "12300004/":
      RetailLoanMetaData.form.label = "Retail APF";
      RetailLoanMetaData.form.name = productType;
      metaData = { ...RetailLoanMetaData };
      break;
    case "12340001/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: SelfEmpBusQueMetaData,
      };
    case "12340001/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: salariedPersonMetadata,
      };
    case "12340001/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: SelfEmpProfQuesMetaData,
      };
    case "12340001/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: SelEmpDevQueMetaData,
      };
    default:
      return {
        formCode: null,
        metaData: null,
      };
  }
  return {
    formCode: productType,
    metaData,
  };
};
