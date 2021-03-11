export const AddressDetails = ({ address }) => {
  if (!Array.isArray(address) || address.length <= 0) {
    return (
      <tr>
        <td>Invalid data</td>
      </tr>
    );
  }
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Address Details
        </th>
      </tr>
      {address?.map((addressData, index) => {
        return (
          <>
            <tr key={index}>
              <th colSpan={2}>
                {addressData?.addressType ?? "No Address Type"} Address
              </th>
              <td colSpan={7}>
                {addressData.addressLine1},{addressData.addressLine2},
                {addressData.landmark},{addressData.location},{addressData.city}
                ,{addressData.district},{addressData.state},
                {addressData.country}-{addressData.pincode}.
              </td>
            </tr>
          </>
        );
      }) ?? ""}
    </>
  );
};
