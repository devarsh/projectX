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

import {
  balanceTransorpopSelfEmpBusQueMetaData,
  balanceTransorpopSelfEmpProfQueMetaData,
  balanceTransorpopsalariedPersonQueMetaData,
  balanceTransorpopSelfEmpDevQueMetaData,
} from "meta/BalanceTransferOrPopUPQuestionsMetaData";

import {
  intsaverSelfEmpBusQueMetaData,
  intsaverSelfEmpProfQueMetaData,
  intsaversalariedPersonQueMetaData,
  intsaverSelfEmpDevQueMetaData,
} from "meta/IntsaverQuestionsMetdata";

import {
  residentialCommercialIndustrialDevQues,
  residentialCommercialIndustrialProfBusQues,
  residentialCommercialIndustrialSalariedQue,
} from "meta/RetailAPF";

import {
  retailDiscountingBalanceTransferSalariedQueMetaData,
  retailDiscountingBalanceTransferSelEmpBusQueMetaData,
  retailDiscountingBalanceTransferSelEmpProfQueMetaData,
  retailDiscountingCommercialIndustrialShedBalanceTransferSelfEmpDevQuesMetaData,
  retailDiscountingCommercialIndustrialSalariedQuesMetaData,
  retailDiscountingCommercialIndustrialSelfEmpBusQuesMetaData,
  retailDiscountingCommercialIndustrialSelfEmpProfQuesMetaData,
} from "meta/RetailDiscounting";

export const chooseNaviagtionPath = (
  productType: string,
  profession: string
) => {
  let metaData;

  switch (`${productType}/${profession ?? ""}`) {
    case "12300001/98":
      RetailLoanMetaData.form.label = "Retail Home Loan";
      RetailLoanMetaData.form.name = productType;
      metaData = { ...RetailLoanMetaData };
      break;
    case "12300002/98":
      RetailLoanMetaData.form.label = "Retail LAP (Loan Against Property)";
      RetailLoanMetaData.form.name = productType;
      metaData = { ...RetailLoanMetaData };
      break;
    case "12300003/98":
      RetailLoanMetaData.form.label = "Retail LRD (Lease Rental Discount)";
      RetailLoanMetaData.form.name = productType;
      metaData = { ...RetailLoanMetaData };
      break;
    case "12300004/98":
      RetailLoanMetaData.form.label = "Retail APF";
      RetailLoanMetaData.form.name = productType;
      metaData = { ...RetailLoanMetaData };
      break;
    //home loan start
    //12340001	New Home Loan
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
    //12340002	Balance Transfer
    case "12340002/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceTransorpopSelfEmpBusQueMetaData,
      };
    case "12340002/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceTransorpopsalariedPersonQueMetaData,
      };
    case "12340002/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceTransorpopSelfEmpProfQueMetaData,
      };
    case "12340002/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceTransorpopSelfEmpDevQueMetaData,
      };
    //12340003	Balance Transfer - Top Up
    case "12340003/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceTransorpopSelfEmpBusQueMetaData,
      };
    case "12340003/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceTransorpopsalariedPersonQueMetaData,
      };
    case "12340003/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceTransorpopSelfEmpProfQueMetaData,
      };
    case "12340003/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: balanceTransorpopSelfEmpDevQueMetaData,
      };
    //12340004	Interest Saver
    case "12340004/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: intsaverSelfEmpBusQueMetaData,
      };
    case "12340004/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: intsaversalariedPersonQueMetaData,
      };
    case "12340004/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: intsaverSelfEmpProfQueMetaData,
      };
    case "12340004/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: intsaverSelfEmpDevQueMetaData,
      };

    //Home Loan End
    //LAP Start
    //12340005	Residential Property
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

    //12340006	Commercial Property
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

    //12340007	Industrial Shed
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

    //12340008	Commercial Property Purchase
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

    //12340009	Balance Transfer
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
    //LAP End

    //LRD Start
    //123400010	Commercial Property
    case "123400010/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingCommercialIndustrialSelfEmpBusQuesMetaData,
      };
    case "123400010/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingCommercialIndustrialSalariedQuesMetaData,
      };
    case "123400010/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingCommercialIndustrialSelfEmpProfQuesMetaData,
      };
    case "123400010/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingCommercialIndustrialShedBalanceTransferSelfEmpDevQuesMetaData,
      };
    //123400011	Industrial Shed
    case "123400011/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingCommercialIndustrialSelfEmpBusQuesMetaData,
      };
    case "123400011/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingCommercialIndustrialSalariedQuesMetaData,
      };
    case "123400011/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingCommercialIndustrialSelfEmpProfQuesMetaData,
      };
    case "123400011/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingCommercialIndustrialShedBalanceTransferSelfEmpDevQuesMetaData,
      };
    //123400012	Balance Transfer
    case "123400012/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingBalanceTransferSelEmpBusQueMetaData,
      };
    case "123400012/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingBalanceTransferSalariedQueMetaData,
      };
    case "123400012/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingBalanceTransferSelEmpProfQueMetaData,
      };
    case "123400012/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: retailDiscountingCommercialIndustrialShedBalanceTransferSelfEmpDevQuesMetaData,
      };
    //LRD End

    //APF Start
    //123400013	Residential
    case "123400013/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialProfBusQues,
      };
    case "123400013/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialSalariedQue,
      };
    case "123400013/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialProfBusQues,
      };
    case "123400013/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialDevQues,
      };
    //123400014	Commercial
    case "123400014/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialProfBusQues,
      };
    case "123400014/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialSalariedQue,
      };
    case "123400014/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialProfBusQues,
      };
    case "123400014/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialDevQues,
      };
    //123400015	Industrial
    case "123400015/01":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialProfBusQues,
      };
    case "123400015/02":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialSalariedQue,
      };
    case "123400015/03":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialProfBusQues,
      };
    case "123400015/04":
      return {
        formCode: `${productType}/${profession}`,
        metaData: residentialCommercialIndustrialDevQues,
      };
    //APF End

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
