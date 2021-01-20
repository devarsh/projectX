import { GroupType } from "./types";

export const docMeta: GroupType[] = [
  {
    groupName: "Pii",
    groupLabel: "Personal Information",
    items: [
      {
        docID: "1",
        docLabel: "Pancard",
        docDescription: "Copy of pancard front and back",
        status: "N",
      },
      {
        docID: "2",
        docLabel: "Aadhar",
        docDescription: "Copy of Aadhar front and back",
        status: "R",
      },
      {
        docID: "3",
        docLabel: "Driving License",
        docDescription: "Front side of License",
        status: "V",
      },
      {
        docID: "4",
        docLabel: "Voter ID Card",
        status: "R",
      },
      {
        docID: "5",
        docLabel: "Light Bill",
        status: "N",
      },
      {
        docID: "6",
        docLabel: "Telephone Bill",
        status: "R",
      },
      {
        docID: "7",
        docLabel: "Gas Bill",
        status: "P",
      },
    ],
  },
  {
    groupName: "Bank",
    groupLabel: "Bank Details",
    items: [
      {
        docID: "1",
        docLabel: "ITR",
        docDescription: "ITR information for past 3 years",
        status: "P",
      },
      {
        docID: "2",
        docLabel: "Bank Statement",
        docDescription: "Bank Statement for past 3 years",
        status: "R",
      },
    ],
  },
];
