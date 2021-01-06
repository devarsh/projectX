import { icon } from "@fortawesome/fontawesome-svg-core";
import { NavBarMetaDataType } from "components/navigation";
import { Children } from "react";

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
      label: "Inquiry Management",
      icon: "tasks",
      children: [
        {
          label: "Inquiries",
          href: "./inquiries",
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
          href: "./pages/customer-interaction",
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
          href: "http://www.google.com",
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
