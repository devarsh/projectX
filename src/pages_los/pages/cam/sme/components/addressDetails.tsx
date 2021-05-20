import { filter } from "lodash";

export const AddressDetails = ({ address }) => {
  if (!Array.isArray(address) || address.length <= 0) {
    return (
      <tr>
        <td>Invalid data</td>
      </tr>
    );
  }

  let addressArray: any = [];
  addressArray = address.map((addressData) => {
    return [
      addressData.address1,
      addressData.address2,
      addressData.landmark,
      addressData.location,
      addressData.district,
      addressData.city,
      addressData.state,
      addressData.country,
      addressData.pincode,
    ];
  });

  let addressType: any = [];
  addressType = address.map((data) => {
    return data.addressType;
  });

  var addressFinalDetails: any = [];
  addressFinalDetails = addressArray.map((data: any) => {
    return data.filter((item) => item !== "").join(",");
  });

  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Address Details
        </th>
      </tr>
      {addressFinalDetails.map((addressData, index) => {
        return (
          <tr>
            <th colSpan={2}>
              {addressData?.index?.addressType ??
                addressType[index] ??
                "No Address Type"}{" "}
              Address
            </th>
            <td colSpan={7}>{addressData}</td>
          </tr>
        );
      })}
    </>
  );
};
