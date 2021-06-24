import { NavBarMetaDataType } from "components/navigation";

export const metaData: NavBarMetaDataType = {
  config: {
    rel: "noopener noreferrer",
    target: "_blank",
  },
  navItems: [
    {
      label: "Dashboard",
      href: "./dashboard",
      isRouterLink: true,
      icon: "hashtag",
    },
    {
      label: "New Inquiry",
      icon: "plus",
      isRouterLink: true,
      href: "./newInquiry",
      children: [
        {
          label: "Retails Loans",
          children: [
            {
              label: "Retail Home Loan",
              href: "./newInquiry/retail-rhl",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000001",
                  productID: "12300001",
                  action: "crm_inquiry_metaData", //this action is used to determine which api to call Question or Inquiry
                },
              },
            },
            {
              label: "Retail LAP (Loan Against Property)",
              href: "./newInquiry/retail-lap",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000001",
                  productID: "12300002",
                  action: "crm_inquiry_metaData",
                },
              },
            },
            {
              label: "Retail LRD (Lease Rental Discount)",
              href: "./newInquiry/retail-ldr",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000001",
                  productID: "12300003",
                  action: "crm_inquiry_metaData",
                },
              },
            },
            {
              label: "Retail APF",
              href: "./newInquiry/retail-apf",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000001",
                  productID: "12300004",
                  action: "crm_inquiry_metaData",
                },
              },
            },
          ],
        },
        {
          label: "SME Loan",
          children: [
            {
              label: "SME CC/OD",
              href: "./newInquiry/sme",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000002",
                  productID: "12300005",
                  action: "crm_inquiry_metaData",
                },
              },
            },
            {
              label: "SME Term Loan",
              href: "./newInquiry/stl",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000002",
                  productID: "12300006",
                  action: "crm_inquiry_metaData",
                },
              },
            },
            {
              label: "SME Term Loan + CC/OD",
              href: "./newInquiry/sme-ccod",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000002",
                  productID: "12300007",
                  action: "crm_inquiry_metaData",
                },
              },
            },
            {
              label: "SME NFB (Non Fund Base)",
              href: "./newInquiry/sme-nfb",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000002",
                  productID: "12300008",
                  action: "crm_inquiry_metaData",
                },
              },
            },
            {
              label: "SME LAP (Loan Against Property)",
              href: "./newInquiry/sme-lap",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000002",
                  productID: "12300009",
                  action: "crm_inquiry_metaData",
                },
              },
            },
            {
              label: "SME CGTMSE",
              href: "./newInquiry/sme-cgtmse",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000002",
                  productID: "123000010",
                  action: "crm_inquiry_metaData",
                },
              },
            },
          ],
        },
        {
          label: "Infra Loan",
          children: [
            {
              label: "Construction Finance",
              href: "./newInquiry/infra-construction",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000003",
                  productID: "123000011",
                  action: "crm_inquiry_metaData",
                },
              },
            },
            {
              label: "Infrastructure Finance",
              href: "./newInquiry/infra-finance",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000003",
                  productID: "123000012",
                  action: "crm_inquiry_metaData",
                },
              },
            },
          ],
        },
        {
          label: "Unsecured Loans",
          children: [
            {
              label: "Business Loan",
              href: "./newInquiry/businessLoan",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000004",
                  productID: "123000013",
                  action: "crm_inquiry_metaData",
                },
              },
            },
            // {
            //   label: "Personal Loan",
            //   href: "./newInquiry/personalLoan",
            //   isRouterLink: true,
            //   navigationProps: {
            //     metaProps: {
            //       categoryID: "12000004",
            //       productID: "123000014",
            //       action: "crm_inquiry_metaData",
            //     },
            //   },
            // },
            // {
            //   label: "School Fee Funding",
            //   href: "./newInquiry/schoolFee",
            //   isRouterLink: true,
            //   navigationProps: {
            //     metaProps: {
            //       categoryID: "12000004",
            //       productID: "123000015",
            //       action: "crm_inquiry_metaData",
            //     },
            //   },
            // },
          ],
        },
      ],
    },
    {
      label: "Inquiry Management",
      icon: "question",
      children: [
        {
          label: "Assigned Inquiries",
          href: "./inquiry/assignedInquiries",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Cross Inquiries",
          href: "./inquiry/crossInquiries",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Incoming Inquiries",
          href: "./inquiry/incomingInquiries",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Unmapped Inquiries",
          href: "./inquiry/unmappedInquiries",
          isRouterLink: true,
          icon: "circle",
        },
      ],
    },
    {
      label: "Lead Management",
      icon: "tasks",
      children: [
        {
          label: "Leads",
          href: "./lead/details",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Mandate",
          href: "./lead/mandate",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Bank Login",
          href: "./lead/bankLogin",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Sanction",
          href: "./lead/sanction",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Disbursement",
          href: "./lead/disbursement",
          isRouterLink: true,
          icon: "circle",
        },
      ],
    },
    {
      label: "Task Management",
      icon: "tasks",
      children: [
        {
          label: "Assign",
          href: "./task/assign",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Assigned",
          href: "./task/assigned",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "WorkLog",
          href: "./task/worklog",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Cold Calling",
          icon: "circle",
        },
      ],
    },
    {
      label: "Config Management",
      icon: "cog",
      children: [
        {
          label: "Bank Master",
          href: "./config/bankMaster",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Bank",
          href: "./config/banks",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "User Management",
          href: "./config/userManagement",
          isRouterLink: true,
          icon: "users",
        },
      ],
    },
  ],
};
