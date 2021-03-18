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
            {
              label: "Personal Loan",
              href: "./newInquiry/personalLoan",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000004",
                  productID: "123000014",
                  action: "crm_inquiry_metaData",
                },
              },
            },
            {
              label: "School Fee Funding",
              href: "./newInquiry/schoolFee",
              isRouterLink: true,
              navigationProps: {
                metaProps: {
                  categoryID: "12000004",
                  productID: "123000015",
                  action: "crm_inquiry_metaData",
                },
              },
            },
          ],
        },
      ],
    },
    {
      label: "Inquiry Management",
      icon: "question",
      isRouterLink: true,
      href: "./inquiries",
    },
    {
      label: "Lead Management",
      icon: "tasks",
      children: [
        {
          label: "Leads",
          href: "./leads",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "CAM",
          href: "./cam",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Customer Interaction",
          href: "./testApi",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Mandate Status",
          href: "./pages/mandate-status",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Documents",
          href: "./pages/documents",
          isRouterLink: true,
          icon: "circle",
        },
      ],
    },
    {
      label: "Config Management",
      icon: "tasks",
      children: [
        {
          label: "Bank",
          href: "./config/banks",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Role Assignment",
          href: "./config/roleAssignment",
          isRouterLink: true,
          icon: "circle",
        },
      ],
    },
    {
      label: "Customers",
      href: "./pages/customers",
      isRouterLink: true,
      icon: "users",
    },
    {
      label: "Loans",
      icon: "balance-scale",
      children: [
        {
          label: "Retail",
          isRouterLink: true,
          href: "./pages/retail",
          icon: "circle",
        },
        {
          label: "SME",
          href: "./pages/sme",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Infra",
          href: "./pages/infra",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Unsecured",
          href: "./pages/unsecured",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Channel Finance",
          href: "./pages/channel-fianance",
          isRouterLink: true,
          icon: "circle",
        },
      ],
    },
    {
      label: "Govt. Subsidy",
      icon: "hands-helping",
      children: [
        {
          label: "Interest Subsidy",
          icon: "circle",
        },
        {
          label: "Central Govt. Subsidy",
          icon: "circle",
        },
        {
          label: "GST Subsidy",
          icon: "circle",
        },
        {
          label: "Capital Subsidy",
          icon: "circle",
        },
        {
          label: "Electric Subsidy",
          icon: "circle",
        },
        {
          label: "Others",
          icon: "circle",
        },
      ],
    },
    {
      label: "Gen. Insurance",
      icon: "home",
      children: [
        {
          label: "Aviation Insurance",
          icon: "circle",
        },
        {
          label: "Credit Insurance",
          icon: "circle",
        },
        {
          label: "Agriculture Insurance",
          icon: "circle",
        },
        {
          label: "Engineering Insurance",
          icon: "circle",
        },
        {
          label: "Fire Insurance",
          icon: "circle",
        },
        {
          label: "Health Insurance",
          icon: "circle",
        },
        {
          label: "Liability Insurance",
          icon: "circle",
        },
        {
          label: "Marine Insurance",
          icon: "circle",
        },
        {
          label: "Miscellaneous Insurance",
          icon: "circle",
        },
        {
          label: "Motor Insurance",
          icon: "circle",
        },
      ],
    },
    {
      label: "Life Insurance",
      icon: "hand-holding-heart",
      children: [
        {
          label: "Term Plan Insurance",
          icon: "circle",
        },
        {
          label: "Traditional Plan Insurance",
          icon: "circle",
        },
        {
          label: "ULIP Plan Insurance",
          icon: "circle",
        },
      ],
    },
    {
      label: "Elite Services",
      icon: "th",
      children: [
        {
          label: "Business Valuations",
          icon: "circle",
        },
        {
          label: "Strategic Financial Advisor",
          icon: "circle",
        },
        {
          label: "Compliance services",
          icon: "circle",
        },
        {
          label: "Equity Fund Raise",
          icon: "circle",
        },

        {
          label: "Merger & Acquisition",
          icon: "circle",
        },
      ],
    },
    {
      label: "Workflow Management",
      icon: "tasks",
      children: [
        {
          label: "Task Report",
          icon: "circle",
        },
        {
          label: "Sales Report",
          icon: "circle",
        },
      ],
    },
    {
      label: "API Management",
      icon: "link",
      children: [
        {
          label: "Health Checkup",
          icon: "circle",
        },
        {
          label: "Bank Statement",
          icon: "circle",
        },
        {
          label: "Fraud Check Unit (FCU)",
          icon: "circle",
        },
        {
          label: "GST Analysis",
          icon: "circle",
        },
        {
          label: "ITR Anlaysis",
          icon: "circle",
        },
        {
          label: "Financial Statement",
          icon: "circle",
        },
        {
          label: "MCA",
          icon: "circle",
        },
      ],
    },

    {
      label: "Partners",
      href: "./pages/partners",
      isRouterLink: true,
      icon: "users-cog",
    },
    {
      label: "Employees",
      href: "./pages/employees",
      isRouterLink: true,
      icon: "users-cog",
    },
    {
      label: "Profile",
      href: "./profile",
      isRouterLink: true,
      icon: "user-circle",
    },
    {
      label: "Settings",
      href: "./pages/settings",
      isRouterLink: true,
      icon: "cog",
    },
  ],
};
