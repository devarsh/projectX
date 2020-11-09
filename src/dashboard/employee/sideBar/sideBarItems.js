export default {
  data: [
    {
      name: "Dashboard",
      url: "/EmployeeDashboard",
      icon: "faHashtag",
    },

    {
      name: "Lead Management",
      icon: "faTasks",
      children: [
        {
          name: "Inquiries",
          url: "/EmployeeLead",
          icon: "faCircle",
        },
        {
          name: "CAM",
          url: "/EmployeeLead",
          icon: "faCircle",
        },
        {
          name: "Customer Interaction",
          url: "/EmployeeLead",
          icon: "faCircle",
        },
        {
          name: "Mandate Status",
          url: "/EmployeeLead",
          icon: "faCircle",
        },
        {
          name: "Documents",
          url: "/EmployeeLead",
          icon: "faCircle",
        },
      ],
    },

    {
      name: "Customers",
      url: "/Customers",
      icon: "faUsers",
    },

    {
      name: "Loans",
      icon: "faBalanceScale",
      children: [
        {
          name: "Retail",
          url: "/Retail",
          icon: "faCircle",
        },
        {
          name: "SME",
          url: "/SME",
          icon: "faCircle",
        },
        {
          name: "Infra",
          url: "/INFRA",
          icon: "faCircle",
        },
        {
          name: "Unsecured",
          url: "/INFRA",
          icon: "faCircle",
        },
        {
          name: "Channel Finance",
          url: "/ChannelFinance",
          icon: "faCircle",
        },
      ],
    },

    {
      name: "Govt. Subsidy",
      icon: "faHandsHelping",
      children: [
        {
          name: "Interest Subsidy",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Central Govt. Subsidy",
          url: "",
          icon: "faCircle",
        },
        {
          name: "GST Subsidy",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Capital Subsidy",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Electric Subsidy",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Others",
          url: "",
          icon: "faCircle",
        },
      ],
    },
    {
      name: "Gen. Insurance",
      icon: "faHome",
      children: [
        {
          name: "Aviation Insurance",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Credit Insurance",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Agriculture Insurance",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Engineering Insurance",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Fire Insurance",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Health Insurance",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Liability Insurance",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Marine Insurance",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Miscellaneous Insurance",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Motor Insurance",
          url: "",
          icon: "faCircle",
        },
      ],
    },

    {
      name: "Life Insurance",
      icon: "faHandHoldingHeart",
      children: [
        {
          name: "Term Plan Insurance",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Traditional Plan Insurance",
          url: "",
          icon: "faCircle",
        },
        {
          name: "ULIP Plan Insurance",
          url: "",
          icon: "faCircle",
        },
      ],
    },

    {
      name: "Elite Services",
      icon: "faTh",
      children: [
        {
          name: "Business Valuations",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Strategic Financial Advisor",
          url: "",
          icon: "faCircle",
        },

        {
          name: "Compliance services",
          url: "",
          icon: "faCircle",
        },
        {
          name: "Equity Fund Raise",
          url: "",
          icon: "faCircle",
        },

        {
          name: "Merger & Acquisition",
          url: "",
          icon: "faCircle",
        },
      ],
    },

    {
      name: "Partners",
      url: "/Partners",
      icon: "faUsersCog",
    },

    {
      name: "Profile",
      url: "/EmployeeProfile",
      icon: "faUserCircle",
    },

    {
      name: "Settings",
      url: "/Settings",
      icon: "faCog",
    },
  ],
};
