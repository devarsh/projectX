import { BankCard } from "./components/cards";

export const columns = [
  {
    columnID: "1",
    name: "selection",
    label: "Bank Selection",
    ribbon: "green",
    component: BankCard,
  },
  {
    columnID: "2",
    name: "login",
    label: "Bank Login",
    ribbon: "#0286d4",
    component: BankCard,
  },
  {
    columnID: "3",
    name: "reject",
    label: "Reject",
    ribbon: "red",
    component: BankCard,
  },
];

export const data = [
  {
    id: 1,
    bank: "State Bank Of India",
    branch: "Head Office",
    columnID: "1",
  },
  {
    id: 2,
    bank: "ICICI Bank Ltd",
    branch: "JMC House",
    columnID: "2",
  },
  {
    id: 3,
    bank: "Kotak Mahinder Bank Ltd",
    branch: "Drive-In Road",
    columnID: "1",
  },
  {
    id: 4,
    bank: "Axis Bank Ltd",
    branch: "Drive-In Road",
    columnID: "1",
  },
  {
    id: 5,
    bank: "Ratnaafin NBFC Ltd",
    branch: "Bopal Ambli",
    columnID: "1",
  },
  { id: 6, bank: "Varacha Co-Op Bank Ltd", branch: "Surat", columnID: "1" },
];
