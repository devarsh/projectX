import { useState, useRef, useCallback, useEffect } from "react";

export const useOptionsFetcher = (
  formState,
  options,
  setOptions,
  handleChangeInterceptor,
  dependentValues,
  incomingMessage,
  runValidation,
  whenToRunValidation
) => {
  const lastOptionsPromise = useRef<Promise<any> | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(false);

  //formState value mutates causing this component to rerender, need to fix
  //for now we wont pass form state as depedency and fix it but needs investigation why this
  //is happening
  const syncAsyncSetOptions = useCallback(
    (options, dependentValues) => {
      if (Array.isArray(options)) {
        setOptions(options);
      } else if (typeof options === "function") {
        try {
          setLoadingOptions(true);
          setOptions([{ label: "loading...", value: null }]);
          let currentPromise = Promise.resolve(
            options(dependentValues, formState)
          );
          lastOptionsPromise.current = currentPromise;
          currentPromise
            .then((result) => {
              setLoadingOptions(false);
              if (lastOptionsPromise.current === currentPromise) {
                if (Array.isArray(result)) {
                  setOptions(result);
                } else {
                  setOptions([{ label: "Couldn't fetch", value: null }]);
                  console.log(
                    `expected optionsFunction in select component to return array of OptionsType but got: ${result}`
                  );
                }
              }
            })
            .catch((e) => {
              setLoadingOptions(false);
              setOptions([{ label: "Couldn't fetch", value: null }]);
              console.log(`error occured while fetching options`, e?.message);
            });
        } catch (e) {
          setLoadingOptions(false);
          setOptions([{ label: "Couldn't fetch", value: null }]);
          console.log(`error occured while fetching options`, e?.message);
        }
      }
    },
    [setOptions]
  );
  const values = useRef({
    options,
    dependentValues,
    syncAsyncSetOptions,
    formState,
  });
  useEffect(() => {
    syncAsyncSetOptions(options, dependentValues);
  }, [options, dependentValues, syncAsyncSetOptions]);

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
