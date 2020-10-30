import RetailLoanMetaData from "meta/retailsLoan";
import {
  SelEmpDevQueMetaData,
  SelfEmpBusQueMetaData,
  SelfEmpProfQuesMetaData,
  salariedPersonMetadata,
} from "meta/NewHomeLoanQuestionsMetadata";
import {
  residentailSelfEmpBusQueMetaData,
  residentialSalariedQueMetadata,
  residentialSelfEmpDevQueMetaData,
  residentialSelfEmpProfQueMetaData,
} from "meta/RetailLAP/ResidentialPropertyQuestionsMetadata";
import {
  balanceSalariedQueMetadata,
  balanceSelfEmpBusQueMetaData,
  balanceSelfEmpDevQueMetaData,
  balanceSelfEmpProfQueMetaData,
} from "meta/RetailLAP/BalanceTransferPropertyQuestionsMetadata";
import {
  commercialPurSalariedQueMetadata,
  commercialPurSelfEmpBusQueMetaData,
  commercialPurSelfEmpDevQueMetaData,
  commercialPurSelfEmpProfQueMetaData,
} from "meta/RetailLAP/CommercialPropertyPurchaseQuestionsMetadata";
import {
  commercialProSalariedQueMetadata,
  commercialProSelfEmpBusQueMetaData,
  commercialProSelfEmpDevQueMetaData,
  commercialProSelfEmpProfQueMetaData,
} from "meta/RetailLAP/CommercialPropertyQuestionsMetadata";
import {
  industrialSalariedQueMetadata,
  industrialSelfEmpBusQueMetaData,
  industrialSelfEmpDevQueMetaData,
  industrialSelfEmpProfQueMetaData,
} from "meta/RetailLAP/IndustrialShedQuestionsMetadata";

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
    case "12340005/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentailSelfEmpBusQueMetaData,
      };
    case "12340005/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialSalariedQueMetadata,
      };
    case "12340005/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialSelfEmpProfQueMetaData,
      };
    case "12340005/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialSelfEmpDevQueMetaData,
      };

    case "12340006/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: commercialProSelfEmpBusQueMetaData,
      };
    case "12340006/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: commercialProSalariedQueMetadata,
      };
    case "12340006/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: commercialProSelfEmpProfQueMetaData,
      };
    case "12340006/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: commercialProSelfEmpDevQueMetaData,
      };

    case "12340007/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: industrialSelfEmpBusQueMetaData,
      };
    case "12340007/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: industrialSalariedQueMetadata,
      };
    case "12340007/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: industrialSelfEmpProfQueMetaData,
      };
    case "12340007/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: industrialSelfEmpDevQueMetaData,
      };

    case "12340008/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: commercialPurSelfEmpBusQueMetaData,
      };
    case "12340008/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: commercialPurSalariedQueMetadata,
      };
    case "12340008/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: commercialPurSelfEmpProfQueMetaData,
      };
    case "12340008/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: commercialPurSelfEmpDevQueMetaData,
      };

    case "12340009/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceSelfEmpBusQueMetaData,
      };
    case "12340009/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceSalariedQueMetadata,
      };
    case "12340009/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceSelfEmpProfQueMetaData,
      };
    case "12340009/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceSelfEmpDevQueMetaData,
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
