import { useRef, useState } from "react";

export const formatSortBy = (sortBy = []) => {
  const formatted = sortBy.map((one: any, index) => ({
    [one?.id ?? ""]: one?.desc ? "desc" : "asc",
    seq: index + 1,
  }));
  return formatted;
};

export const formatFilterBy = (filterBy = []) => {
  const formatted = filterBy.map((one: any, index) => ({
    accessor: one.id,
    ...one.value,
  }));
  return formatted;
};

export const useLocalFilterState = () => {
  const filterState = useRef<object>({});
  const addFilterState = (accessor, state) => {
    let currentState;
    currentState = { [accessor]: state };

    if (filterState.current === null) {
      filterState.current = currentState;
    } else {
      filterState.current = {
        ...filterState.current,
        ...currentState,
      };
    }
  };
  const getFilterState = (accessor) => {
    if (typeof filterState.current === "object") {
      return filterState.current[accessor];
    }
    return;
  };
  const removeFilterState = (accessor) => {
    if (typeof filterState.current === "object") {
      delete filterState.current[accessor];
    }
  };
  const clearFilterState = () => {
    filterState.current = {};
  };

  return {
    addFilterState,
    removeFilterState,
    clearFilterState,
    getFilterState,
  };
};

export const useFilterState = () => {
  const [state, setState] = useState<object | null>(null);
  const addHeaderFilter = (accessor, filterValue) => {
    if (typeof state !== "object" || state === null) {
      setState({ [accessor]: filterValue });
    } else {
      setState((old) => ({ ...old, [accessor]: filterValue }));
    }
  };
  const removeHeaderFilter = (accessor) => {
    if (typeof state === "object" && state !== null) {
      const result = delete state[accessor];
      if (result) {
        if (Object.keys(state).length === 0) {
          setState(null);
        }
        setState(state);
      }
    }
  };
  const clearHeaderFilter = () => {
    setState(null);
  };
  return {
    addHeaderFilter,
    removeHeaderFilter,
    clearHeaderFilter,
    state,
  };
};