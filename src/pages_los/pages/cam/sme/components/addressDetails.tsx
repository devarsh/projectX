export const AddressDetails = ({ address }) => {
  if (!Array.isArray(address) || address.length <= 0) {
    return null;
  }

  var addressFinalDetails: any = [];
  var filterAdessType: any = [];
  const transformAddressData = (addressData: any) => {
    addressData
      .map((data: any) => {
        var filteredAddressData: any = [];
        filterAdessType.push(data.addressType);
        for (var key in data) {
          if (data[key] !== null && data[key] !== "") {
            filteredAddressData.push(data[key]);
          }
        }
        return filteredAddressData;
      })
      .map((i, idx) => {
        addressFinalDetails.push({
          th: filterAdessType[idx],
          td: i.join(),
        });
      });
  };
  //@ts-ignore
  let addressDetails: any = {};
  addressDetails = transformAddressData(address);

  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Address Details
        </th>
      </tr>
      {addressFinalDetails?.map((addressData, index) => {
        return (
          <tr key={index}>
            <th colSpan={2}>
              {addressData?.th ?? "Address Type Not Available"} Address
            </th>
            <td colSpan={7}>{addressData?.td ?? "No data Found"}</td>
          </tr>
        );
      }) ?? ""}
    </>
  );
};
