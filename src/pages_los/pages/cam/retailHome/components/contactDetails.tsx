export const ContactDetails = ({ contact }) => {
  if (!Array.isArray(contact) || contact.length <= 0) {
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
          Contact Details
        </th>
      </tr>
      {contact?.map((addressData, index) => {
        return (
          <>
            <tr key={index}>
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
