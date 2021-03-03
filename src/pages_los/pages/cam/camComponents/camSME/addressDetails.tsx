export const AddressDetails = ({ address }) => {
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Address Details
        </th>
      </tr>
      {address?.map((addressData) => {
        return (
          <>
            <tr>
              <th colSpan={2}>{addressData?.addressType ?? ""} Address</th>
              <td colSpan={7}>
                {addressData?.address1 ?? ""},{addressData?.address2 ?? ""},
                {addressData?.landmark ?? ""},{addressData?.location ?? ""},
                {addressData?.city ?? ""},{addressData?.district ?? ""},
                {addressData?.state ?? ""},{addressData?.country ?? ""}-
                {addressData?.pincode ?? ""}.
              </td>
            </tr>
          </>
        );
      }) ?? ""}
    </>
  );
};
