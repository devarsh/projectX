import { atomFamily, selectorFamily, DefaultValue } from "recoil";

interface QueryType {
  accessor: string;
  result_type: string;
  filter_conditions: any[];
}
interface FilterAtomType {
  query: QueryType | null;
  result:
    | {
        label: string;
        value: string;
        count: string;
      }[]
    | {
        minValue: string;
        maxValue: string;
      }
    | null;
}

export const filterAtom = atomFamily<FilterAtomType, string>({
  key: "filters",
  default: {
    query: null,
    result: null,
  },
});

export const subscribeToUpdates = selectorFamily<QueryType[], string[]>({
  key: "filterSubscriber",
  get: (subscriptionFilters) => ({ get }) => {
    if (Array.isArray(subscriptionFilters)) {
      let result: QueryType[] = [];
      for (let filter of subscriptionFilters) {
        let fieldState = get(filterAtom(filter));
        if (typeof fieldState.query === "object" && fieldState.query !== null) {
          result.push(fieldState.query);
        }
      }
      return result;
    }
    return [];
  },
});
