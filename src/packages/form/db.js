/*

React.useEffect(() => {
    const initDB = async () => {
      dbRef.current = await initiateDB(formContext.formName);
      if (Boolean(formContext.initializeFromStore) === true) {
        initializeFromStore();
      }
    };
    initDB();
  }, [formContext.formName, formContext.initializeFromStore]);

const initializeFromStore = useRecoilCallback(
    ({ snapshot, gotoSnapshot }) => async () => {
      console.log(dbRef);
      if (dbRef.current === null) {
        return;
      }
      const dbInst = dbRef.current;

      await dbInst.sanitizeStore();

      const formFieldState = await dbInst.getFormFields();
      const formFieldRegistry = await dbInst.getFormFieldsRegistry();
      const formArrayFieldRowsState = await dbInst.getFormArrayFieldRows();
      const formArrayFieldRegistry = await dbInst.getFormArrayFieldsRegistry();
      const newSnapshot = snapshot.map((mutableSnapshot) => {
        if (typeof formFieldState === "object") {
          for (const one of Object.values(formFieldState)) {
            mutableSnapshot.set(formFieldAtom(one.fieldKey), (old) => ({
              ...old,
              ...one,
            }));
          }
        }
        if (Array.isArray(formFieldRegistry)) {
          mutableSnapshot.set(
            formFieldRegistryAtom(formContext.formName),
            formFieldRegistry
          );
        }
        if (typeof formArrayFieldRowsState === "object") {
          for (const one of Object.values(formArrayFieldRowsState)) {
            mutableSnapshot.set(formArrayFieldRowsAtom(one.fieldName), one);
          }
        }
        if (Array.isArray(formArrayFieldRegistry)) {
          mutableSnapshot.set(
            formArrayFieldRegistryAtom(formContext.formName),
            formArrayFieldRegistry
          );
        }
      });
      gotoSnapshot(newSnapshot);
    },
    []
  );
*/
