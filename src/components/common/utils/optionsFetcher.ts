import { useEffect } from "react";
import { useQuery } from "react-query";

export const useOptionsFetcher = (
  formState,
  options,
  setOptions,
  handleChangeInterceptor,
  dependentValues,
  incomingMessage,
  runValidation,
  whenToRunValidation,
  _optionsKey,
  disableCaching
) => {
  let loadingOptions = false;

  let queryKey: any[] = [];
  if (Boolean(disableCaching)) {
    queryKey = [_optionsKey, formState, dependentValues];
  } else {
    queryKey = [_optionsKey, formState];
  }
  const queryOptions = useQuery(
    queryKey,
    () => options(dependentValues, formState),
    {
      enabled: typeof options === "function",
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  loadingOptions = queryOptions.isLoading;
  useEffect(() => {
    if (options === undefined) {
      setOptions([{ label: "No Data", value: null }]);
      loadingOptions = false;
    } else if (Array.isArray(options)) {
      setOptions(options);
      loadingOptions = false;
    } else if (queryOptions.isLoading) {
      setOptions([{ label: "loading...", value: null }]);
      loadingOptions = true;
    } else if (queryOptions.isError) {
      setOptions([{ label: "Couldn't fetch", value: null }]);
      console.log(
        `error occured while fetching data for ${_optionsKey}`,
        queryOptions.error
      );
      loadingOptions = false;
    } else {
      if (Array.isArray(queryOptions.data)) {
        setOptions(queryOptions.data);
      } else {
        setOptions([{ label: "Couldn't fetch", value: null }]);
        console.log(
          `expected optionsFunction:${_optionsKey} in select component to return array of OptionsType but got: ${queryOptions.data}`
        );
      }
      loadingOptions = false;
    }
  }, [loadingOptions]);

  useEffect(() => {
    if (incomingMessage !== null && typeof incomingMessage === "object") {
      const { value, options } = incomingMessage;
      //this a patch to not change current value we have as default value
      if (value !== "DEFAULT_VALUE") {
        handleChangeInterceptor(value);
      }
      if (whenToRunValidation === "onBlur") {
        runValidation({ value: value }, true);
      }
      if (Array.isArray(options)) {
        setOptions(options);
      }
    }
  }, [
    incomingMessage,
    setOptions,
    handleChangeInterceptor,
    runValidation,
    whenToRunValidation,
  ]);

  return { loadingOptions };
};

export const useOptionsFetcherSimple = (
  options,
  setOptions,
  _optionsKey,
  disableCaching
) => {
  let loadingOptions = false;

  let queryKey: any[] = [];
  if (Boolean(disableCaching)) {
    queryKey = [_optionsKey];
  } else {
    queryKey = [_optionsKey];
  }
  const queryOptions = useQuery(queryKey, () => options(), {
    enabled: typeof options === "function",
    cacheTime: 100000000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  loadingOptions = queryOptions.isLoading;
  useEffect(() => {
    console.log(queryOptions);
    if (options === undefined) {
      setOptions([{ label: "No Data", value: null }]);
      loadingOptions = false;
    } else if (Array.isArray(options)) {
      setOptions(options);
      loadingOptions = false;
    } else if (queryOptions.isLoading) {
      setOptions([{ label: "loading...", value: null }]);
      loadingOptions = true;
    } else if (queryOptions.isError) {
      setOptions([{ label: "Couldn't fetch", value: null }]);
      console.log(
        `error occured while fetching data for ${_optionsKey}`,
        queryOptions.error
      );
      loadingOptions = false;
    } else {
      if (Array.isArray(queryOptions.data)) {
        setOptions(queryOptions.data);
      } else {
        setOptions([{ label: "Couldn't fetch", value: null }]);
        console.log(
          `expected optionsFunction:${_optionsKey} in select component to return array of OptionsType but got: ${queryOptions.data}`
        );
      }
      loadingOptions = false;
    }
  }, [loadingOptions]);

  return { loadingOptions };
};
