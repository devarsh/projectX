import { memo, Fragment, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APISDK } from "registry/fns/sdk";
import FormWrapper, {
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";
import { InitialValuesType } from "packages/form";
import { TabFormDemo } from "./tabFormDemo";
import { TabFormPreview } from "./tabFormPreview";

const MemoizedFormWrapper = memo(FormWrapper);

interface TabFormProps {
  metaData: MetaDataType;
  initialValues?: InitialValuesType;
  showPreviewDialog?: any;
}

const TabForm: FC<TabFormProps> = ({
  metaData,
  initialValues,
  showPreviewDialog,
}) => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [submitProps, setSubmitProps] = useState({});

  const onSubmitHandler = async (values, submitEnd) => {
    setSubmitProps(() => ({
      values: values,
      submitEnd: submitEnd,
    }));
    setShowDialog(true);
  };
  console.log("show dialog", showDialog);
  const result = /*!isMetaDataValid(metaData)*/ !true ? (
    <span>Error loading form</span>
  ) : (
    <Fragment>
      <MemoizedFormWrapper
        metaData={metaData}
        initialValues={initialValues}
        onSubmitHandler={onSubmitHandler}
      />
      {showDialog ? (
        <TabFormPreview
          isOpen={showDialog}
          setShowDialog={setShowDialog}
          submitProps={submitProps}
        />
      ) : null}
    </Fragment>
  );

  return result;
};

export const TabFormWrapper = () => {
  return <TabForm metaData={TabFormDemo} showPreviewDialog={TabFormPreview} />;
};
