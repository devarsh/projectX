import React from "react";
import {
  useRecoilCallback,
  useRecoilValue,
  useRecoilTransactionObserver_UNSTABLE,
} from "recoil";
import {
  formAtom,
  formFieldAtom,
  formFieldRegistryAtom,
  formArrayFieldRowsAtom,
  formArrayFieldRegistryAtom,
  atomKeys,
} from "./atoms";
import { setIn, getIn } from "./util";
import {
  FieldsErrorObjType,
  FormFieldAtomType,
  InitialValuesType,
  UseFormHookProps,
  FormFieldRegistryAtomType,
  FormArrayFieldRowsAtomType,
  FormAtomType,
  FormFieldAtomSerializableType,
} from "./types";
import { FormContext } from "./context";
import { StoreType, initiateDB } from "./store";

export const useForm = ({ onSubmit }: UseFormHookProps) => {
  const formContext = React.useContext(FormContext);
  const dbRef = React.useRef<StoreType | null>(null);
  const formState = useRecoilValue(formAtom(formContext.formName));

  useRecoilTransactionObserver_UNSTABLE(async ({ snapshot }) => {
    if (Boolean(formContext.autoSave) === false) {
      return;
    }
    if (dbRef.current === null) {
      return;
    }
    //@ts-ignore
    const nodes: Iterable<RecoilValue<any>> = snapshot.getNodes_UNSTABLE({
      isModified: true,
    });
    const fieldsToBeUpdated: FormFieldAtomSerializableType[] = [];
    for (const oneNode of nodes) {
      let node = snapshot.getLoadable(oneNode);
      if (node.state === "hasValue") {
        const trimmedKey = oneNode.key.substr(0, oneNode.key.indexOf("__"));
        switch (trimmedKey) {
          case atomKeys.formAtom: {
            const value = node.contents as FormAtomType;
            dbRef.current.setForm(value);
            break;
          }
          case atomKeys.formFieldAtom: {
            const value = node.contents as FormFieldAtomType;
            fieldsToBeUpdated.push({
              fieldKey: value.fieldKey,
              name: value.name,
              error: value.error,
              value: value.value,
              touched: value.touched,
            });
            break;
          }
          case atomKeys.formFieldRegistryAtom: {
            const value = node.contents as FormFieldRegistryAtomType;
            dbRef.current.setFormFieldRegistry(value);
            break;
          }
          case atomKeys.formArrayFieldRowsAtom: {
            const value = node.contents as FormArrayFieldRowsAtomType;
            dbRef.current.setFormArrayFieldRows([value], false);
            break;
          }
          case atomKeys.formArrayFieldRegistryAtom: {
            const value = node.contents as string[];
            dbRef.current.setFormArrayFieldsRegistry(value);
            break;
          }
          default: {
            break;
          }
        }
      }
    }
    dbRef.current.setFormField(fieldsToBeUpdated, false);
  });

  const setInitValues = React.useCallback(
    useRecoilCallback(
      ({ set, snapshot }) => (initValues: InitialValuesType) => {
        const loadableFields = snapshot.getLoadable(
          formFieldRegistryAtom(formContext.formName)
        );
        if (loadableFields.state === "hasValue") {
          const fields = loadableFields.contents;
          for (const field of fields) {
            const trimFormNameFromFieldName = field.replace(
              `${formContext.formName}/`,
              ""
            );
            let defaultValue =
              typeof initValues === "object"
                ? getIn(initValues, trimFormNameFromFieldName, "")
                : "";
            set(formFieldAtom(field), (currVal) => ({
              ...currVal,
              touched: false,
              value: defaultValue,
              error: "",
              validationRunning: false,
            }));
          }
          //Inititalize ArrayField
          const loadableArrayFields = snapshot.getLoadable(
            formArrayFieldRegistryAtom(formContext.formName)
          );
          if (loadableArrayFields.state === "hasValue") {
            const arrayFields = loadableArrayFields.contents;
            for (const arrayField of arrayFields) {
              set(formArrayFieldRowsAtom(arrayField), (old) => ({
                ...old,
                resetFlag: true,
              }));
            }
          }
        }
      }
    ),
    []
  );

  const startSubmit = React.useCallback(
    useRecoilCallback(({ set }) => () => {
      set(formAtom(formContext.formName), (currVal) => ({
        ...currVal,
        isSubmitting: true,
        submitAttempt: currVal.submitAttempt + 1,
      }));
    }),
    []
  );

  const endSubmit = React.useCallback(
    useRecoilCallback(
      ({ set }) => (
        submitSuccessful: boolean = false,
        message: string = ""
      ) => {
        set(formAtom(formContext.formName), (currVal) => ({
          ...currVal,
          isSubmitting: false,
          submitSuccessful,
          serverSentError: message,
        }));
      }
    ),
    []
  );
  const setFieldErrors = React.useCallback(
    useRecoilCallback(
      ({ set }) => (fieldsErrorObj: FieldsErrorObjType = {}) => {
        for (const field of Object.entries(fieldsErrorObj)) {
          const [fieldName, error] = field;
          set(
            formFieldAtom(`${formContext.formName}/${fieldName}`),
            (currVal) => ({
              ...currVal,
              error: error,
            })
          );
        }
      }
    ),
    []
  );
  const handleClear = React.useCallback(
    useRecoilCallback(
      ({ snapshot, set }) => (e: React.FormEvent<any> | any) => {
        e?.preventDefault?.();
        const loadableFields = snapshot.getLoadable(
          formFieldRegistryAtom(formContext.formName)
        );
        if (loadableFields.state === "hasValue") {
          const fields = loadableFields.contents;
          for (const field of fields) {
            set(formFieldAtom(field), (currVal) => ({
              ...currVal,
              touched: false,
              value: "",
              error: "",
              validationRunning: false,
            }));
          }
        }
        const loadableArrayFields = snapshot.getLoadable(
          formArrayFieldRegistryAtom(formContext.formName)
        );
        if (loadableArrayFields.state === "hasValue") {
          const arrayFields = loadableArrayFields.contents;
          for (const arrayField of arrayFields) {
            set(formArrayFieldRowsAtom(arrayField), (old) => ({
              ...old,
              resetFlag: false,
              templateFieldRows: [],
              lastInsertIndex: -1,
            }));
          }
        }
      }
    ),
    []
  );

  const handleReset = React.useCallback(
    (e: React.FormEvent<any>) => {
      e.preventDefault();
      if (
        typeof formContext.initialValues === "object" &&
        Object.keys(formContext.initialValues).length > 0
      ) {
        setInitValues(formContext.initialValues);
      } else {
        handleClear(null);
      }
    },
    [setInitValues, handleClear, formContext.initialValues]
  );

  const handleSubmit = React.useCallback(
    useRecoilCallback(({ snapshot, set }) => (e: React.FormEvent<any>) => {
      const _handleSubmit = async (e: React.FormEvent<any>) => {
        const loadableFields = snapshot.getLoadable(
          formFieldRegistryAtom(formContext.formName)
        );
        if (loadableFields.state === "hasValue") {
          const fields = loadableFields.contents;
          const fieldsAggrigator: FormFieldAtomType[] = [];
          let hasError = false;
          for (const field of fields) {
            const loadableFieldState = snapshot.getLoadable(
              formFieldAtom(field)
            );
            if (loadableFieldState.state === "hasValue") {
              const _fieldState = loadableFieldState.contents;
              const fieldState = { ..._fieldState };
              if (!fieldState.touched || fieldState.validationRunning) {
                const customValidator =
                  typeof fieldState.validate === "function"
                    ? fieldState.validate
                    : async (data: FormFieldAtomType) => data.error;
                let result: any;
                try {
                  result = await Promise.resolve(customValidator(fieldState));
                } catch (e) {
                  result = e.message;
                }
                if (hasError === false) {
                  hasError = Boolean(result);
                }
                const newValue = {
                  ...fieldState,
                  touched: true,
                  error: result,
                };
                fieldsAggrigator.push(newValue);
                set(formFieldAtom(field), newValue);
              } else {
                fieldsAggrigator.push(fieldState);
                if (hasError === false) {
                  hasError = Boolean(fieldState.error);
                }
              }
            }
          }
          //if form has no errors would procced with submitting the form
          if (!hasError) {
            if (typeof onSubmit === "function") {
              let obj = {};
              for (const field of fieldsAggrigator) {
                obj = setIn(obj, field.name, field.value);
              }
              onSubmit(obj, startSubmit, endSubmit, setFieldErrors);
            }
          }
        }
      };
      e.preventDefault();
      _handleSubmit(e);
    }),
    []
  );

  return { handleSubmit, handleReset, handleClear, ...formState };
};
