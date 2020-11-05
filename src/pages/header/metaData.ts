import { NavBarType } from "./types";
import PersonIcon from "@material-ui/icons/Person";

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
      label: "Login",
      icon: PersonIcon,
      iconPosition: "after",
      children: [
        {
          label: "Customer",
        },
        {
          label: "Partner",
        },
        {
          label: "Employee",
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
              formCode: "12300001",
            },
            {
              label: "Retail LAP (Loan Against Property)",
              href: "/form/lap",
              isRouterLink: true,
              formCode: "12300002",
            },
            {
              label: "Retail LRD (Lease Rental Discount)",
              href: "/form/ldr",
              isRouterLink: true,
              formCode: "12300003",
            },
            {
              label: "Retail APF",
              href: "/form/apf",
              isRouterLink: true,
              formCode: "12300004",
            },
          ],
        },
        {
          label: "SME Loan",
          children: [
            {
              label: "SME CC/OD",
              href: "/",
              isRouterLink: true,
            },
            {
              label: "SME Term Loan",
              href: "/thankyou",
              isRouterLink: true,
            },
            {
              label: "SME Term Loan + CC/OD",
              href: "/",
            },
            {
              label: "SME NFB (Non Fund Base)",
            },
            {
              label: "SME LAP (Loan Against Property)",
            },
            {
              label: "SME CGTMSE",
            },
          ],
        },
        {
          label: "Infra Loan",
          children: [
            {
              label: "Construction Finance",
            },
            {
              label: "Infrastructure Finance",
            },
          ],
        },
        {
          label: "Unsecured Loans",
          children: [
            {
              label: "Business Loan",
            },
            {
              label: "Personal Loan",
            },
            {
              label: "School Fee Funding",
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
