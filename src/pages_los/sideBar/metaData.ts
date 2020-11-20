import { NavBarType } from "pages_crm/header/types";

export const metaData: NavBarType = {
  config: {
    rel: "noopener noreferrer",
    target: "_blank",
  },
  navItems: [
    {
      label: "Dashboard",
      href: "/EmployeeDashboard",
      isRouterLink: true,
      icon: "hashtag",
    },
    {
      label: "Lead Management",
      icon: "tasks",
      children: [
        {
          label: "Inquiries",
          href: "/EmployeeLead",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "CAM",
          href: "/EmployeeLead",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Customer Interaction",
          href: "/EmployeeLead",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Mandate Status",
          href: "/EmployeeLead",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Documents",
          href: "/EmployeeLead",
          isRouterLink: true,
          icon: "circle",
        },
      ],
    },

    {
      label: "Customers",
      href: "/Customers",
      isRouterLink: true,
      icon: "users",
    },

    {
      label: "Loans",
      icon: "balance-scale",
      children: [
        {
          label: "Retail",
          href: "/Retail",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "SME",
          href: "/SME",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Infra",
          href: "/INFRA",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Unsecured",
          href: "/INFRA",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Channel Finance",
          href: "/ChannelFinance",
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
      label: "Partners",
      href: "/Partners",
      isRouterLink: true,
      icon: "users-cog",
    },
    {
      label: "Profile",
      href: "/EmployeeProfile",
      isRouterLink: true,
      icon: "user-circle",
    },
    {
      label: "Settings",
      href: "/Settings",
      isRouterLink: true,
      icon: "cog",
    },
  ],
};
