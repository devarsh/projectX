import { NavBarType } from "./types";
import AccountCircle from "@material-ui/icons/AccountCircle";

export const siteNav: NavBarType = {
  config: {
    rel: "noopener noreferrer",
    target: "_blank",
  },
  navItems: [
    {
      label: "About Us",
      href: "https://ratnaafin.com/about-us/",
      children: [
        {
          label: "Who We Are",
          href: "https://ratnaafin.com/who-we-are/",
        },
        {
          label: "Vision & Mission",
          href: "https://ratnaafin.com/vision-mission/",
        },
        {
          label: "Core Values",
          href: "https://ratnaafin.com/core-values/",
        },
        {
          label: "Clients",
          href: "https://ratnaafin.com/clients/",
        },
        {
          label: "Testimonials",
          href: "https://ratnaafin.com/testimonials/",
        },
        {
          label: "Team",
          href: "https://ratnaafin.com/team/",
        },
        {
          label: "Company Profile",
          href: "https://ratnaafin.com/company-profile/",
        },
      ],
    },
    {
      label: "Team",
      href: "https://ratnaafin.com/team/",
    },
    {
      label: "Insights",
      href: "https://ratnaafin.com/insights/",
    },
    {
      label: "Events",
      href: "https://ratnaafin.com/events/",
      children: [
        {
          label: "Professional Events",
          href: "https://ratnaafin.com/professional-events/",
        },
        {
          label: "Social Events",
          href: "https://ratnaafin.com/social-events/",
        },
      ],
    },
    {
      label: "Tools",
      href: "https://ratnaafin.com/tools/",
      children: [
        {
          label: "GST Calculator",
          href: "https://ratnaafin.com/gst-calculator/",
        },
        {
          label: "EMI Calculator",
          href: "https://ratnaafin.com/emi-calculator/",
        },
        {
          label: "CIBIL",
          href: "https://ratnaafin.com/cibil/",
        },
      ],
    },
    {
      label: "Careers",
      href: "https://ratnaafin.com/careers/",
    },
    {
      label: "Contact Us",
      href: "https://ratnaafin.com/contact-us/",
    },
    {
      label: " Login",
      icon: AccountCircle,
      iconPosition: "before",
      children: [
        {
          label: "Customer",
        },
        {
          label: "Partner",
        },
        {
          label: "Employee",
          href: "/login",
          isRouterLink: true,
        },
      ],
    },
  ],
};

export const formsNav: NavBarType = {
  config: {
    rel: "noopener noreferrer",
    target: "_blank",
  },
  navItems: [
    {
      label: "Loans",
      children: [
        {
          label: "Retails Loans",
          children: [
            {
              label: "Retail Home Loan",
              href: "/form/rhl",
              isRouterLink: true,
              navigationProps: {
                prodCode: "12300001",
                empCode: "98",
              },
            },
            {
              label: "Retail LAP (Loan Against Property)",
              href: "/form/lap",
              isRouterLink: true,
              navigationProps: {
                prodCode: "12300002",
                empCode: "98",
              },
            },
            {
              label: "Retail LRD (Lease Rental Discount)",
              href: "/form/ldr",
              isRouterLink: true,
              navigationProps: {
                prodCode: "12300003",
                empCode: "98",
              },
            },
            {
              label: "Retail APF",
              href: "/form/apf",
              isRouterLink: true,
              navigationProps: {
                prodCode: "12300004",
                empCode: "98",
              },
            },
          ],
        },
        {
          label: "SME Loan",
          children: [
            {
              label: "SME CC/OD",
              href: "/form/sme",
              isRouterLink: true,
              navigationProps: {
                prodCode: "12300005",
                empCode: "98",
              },
            },
            {
              label: "SME Term Loan",
              href: "/form/sme",
              isRouterLink: true,
              navigationProps: {
                prodCode: "12300006",
                empCode: "98",
              },
            },
            {
              label: "SME Term Loan + CC/OD",
              href: "/form/sme",
              isRouterLink: true,
              navigationProps: {
                prodCode: "12300007",
                empCode: "98",
              },
            },
            {
              label: "SME NFB (Non Fund Base)",
              href: "/form/sme",
              isRouterLink: true,
              navigationProps: {
                prodCode: "12300008",
                empCode: "98",
              },
            },
            {
              label: "SME LAP (Loan Against Property)",
              href: "/form/sme",
              isRouterLink: true,
              navigationProps: {
                prodCode: "12300009",
                empCode: "98",
              },
            },
            {
              label: "SME CGTMSE",
              href: "/form/sme",
              isRouterLink: true,
              navigationProps: {
                prodCode: "123000010",
                empCode: "98",
              },
            },
          ],
        },
        {
          label: "Infra Loan",
          children: [
            {
              label: "Construction Finance",
              href: "/form/infra",
              isRouterLink: true,
              navigationProps: {
                prodCode: "123000011",
                empCode: "98",
              },
            },
            {
              label: "Infrastructure Finance",
              href: "/form/infra",
              isRouterLink: true,
              navigationProps: {
                prodCode: "123000012",
                empCode: "98",
              },
            },
          ],
        },
        {
          label: "Unsecured Loans",
          children: [
            {
              label: "Business Loan",
              href: "/form/business",
              isRouterLink: true,
              navigationProps: {
                prodCode: "123000013",
                empCode: "98",
              },
            },
            {
              label: "Personal Loan",
              href: "/form/personal",
              isRouterLink: true,
              navigationProps: {
                prodCode: "123000014",
                empCode: "98",
              },
            },
            {
              label: "School Fee Funding",
              href: "/form/schoolFee",
              isRouterLink: true,
              navigationProps: {
                prodCode: "123000015",
                empCode: "98",
              },
            },
          ],
        },
        {
          label: "Channel Finance",
          children: [
            {
              label: "Anchor Lead Bill Discounting",
            },
            {
              label: "Anchor Lead Input Finance",
            },
            {
              label: "Vendor Lead Bill Discounting",
            },
          ],
        },
      ],
    },
    {
      label: "Govt. Subsidy",
      children: [
        {
          label: "Interest Subsidy",
        },
        {
          label: "Central Govt. Subsidy",
        },
        {
          label: "GST Subsidy",
        },
        {
          label: "Capital Subsidy",
        },
        {
          label: "Electric Subsidy",
        },
        {
          label: "Others",
        },
      ],
    },
    {
      label: "Gen. Insurance",
      children: [
        {
          label: "Aviation Insurance",
        },
        {
          label: "Credit Insurance",
        },
        {
          label: "Agriculture Insurance",
        },
        {
          label: "Engineering Insurance",
        },
        {
          label: "Fire Insurance",
        },
        {
          label: "Health Insurance",
        },
        {
          label: "Liability Insurance",
        },
        {
          label: "Marine Cargo",
        },
        {
          label: "Miscellaneous Insurance",
        },
        {
          label: "Motor Insurance",
        },
      ],
    },
    {
      label: "Life Insurance",
      children: [
        {
          label: "Term Plan Insurance",
        },
        {
          label: "Traditional Plan Insurance",
        },
        {
          label: "ULIP PlancInsurance",
        },
      ],
    },
    {
      label: "Elite Services",
      children: [
        {
          label: "Business Valuations",
          children: [
            {
              label: "Business Takeover",
            },
            {
              label: "Purchase Valuation",
            },
            {
              label: "New Share Issue valuation",
            },
            {
              label: "Business Synergy Valuation",
            },
          ],
        },
        {
          label: "Strategic Financial Advisor",
          children: [
            {
              label: "Company profile preparation",
            },
            {
              label: "Outsourced CFO Service",
            },
            {
              label: "Project Report",
            },
            {
              label: "Financial Projections",
            },
          ],
        },
        {
          label: "Compliance services",
          children: [
            {
              label: "COP certificate",
            },
            {
              label: "MOF certificate",
            },
            {
              label: "Funds Utilisation Certificate",
            },
            {
              label: "DCCO Certificate",
            },
            {
              label: "Net Worth Certificate",
            },
            {
              label: "Statutary Compliance Certificate",
            },
            {
              label: "Certificate for Subsidy",
            },
          ],
        },
        {
          label: "Equity Fund Raise",
          children: [
            {
              label: "Angle Fund Raise",
            },
            {
              label: "Seed Fund Raise",
            },
            {
              label: "VC Fund Raise",
            },
            {
              label: "PE Fund Raise",
            },
          ],
        },
        {
          label: "Merger & Acquisition",
        },
      ],
    },
    {
      label: "Investment Banking",
      href: "https://ratnaafin.com/investment-banking/",
      children: [
        {
          label: "Fund Raise",
          href: "https://ratnaafin.com/professional-events/",
          children: [
            {
              label: "Loans",
              href: "https://ratnaafin.com/loans/",
            },
            {
              label: "Equity",
              href: "https://ratnaafin.com/equity/",
            },
          ],
        },
        {
          label: "Merger & Acquisitions",
          href: "https://ratnaafin.com/merger-acquisitions/",
        },
        {
          label: "Financial Compliances",
          href: "https://ratnaafin.com/financial-compliances/",
        },
        {
          label: "Transaction Advisory",
          href: "https://ratnaafin.com/transaction-advisory/",
        },
      ],
    },
    {
      label: "Lending",
      href: "https://ratnaafin.com/lending-2/",
    },
    {
      label: "Global Solutions",
      children: [
        {
          label: "Offshore Services",
          href: "https://ratnaafin.com/offshore-services/",
        },
        {
          label: "KPO",
          href: "https://ratnaafin.com/kpo/",
        },
      ],
    },
  ],
};
