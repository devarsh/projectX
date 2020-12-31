import { memo, Fragment, FC, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { APISDK } from "registry/fns/sdk";
import FormWrapper, {
  ViewFormWrapper,
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";
import { InitialValuesType } from "packages/form";
import { CC_ODMetaData } from "./CC_ODMetaData";
import { CAMFormPreviewPage } from "./formPreview";

const MemoizedFormWrapper = memo(FormWrapper);

interface TabFormProps {
  metaData: MetaDataType;
  initialValues?: InitialValuesType;
}

const CC_ODForm: FC<TabFormProps> = ({ metaData, initialValues }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [submitProps, setSubmitProps] = useState({});
  const [formData, setFormData] = useState({});

  const onSubmitHandlerNew = (values, submitEnd) => {
    setFormData(values);
    setShowDialog(true);
  };

  const handleCloseDetails = () => {
    setShowDialog(false);
  };

  const onSubmitHandler = async (values, submitEnd) => {
    setSubmitProps(() => ({
      values: values,
      submitEnd: submitEnd,
    }));
    setShowDialog(true);
  };
  const result = /*!isMetaDataValid(metaData)*/ !true ? (
    <span>Error loading form</span>
  ) : (
    <Fragment>
      <MemoizedFormWrapper
        metaData={metaData}
        initialValues={initialValues}
        onSubmitHandler={onSubmitHandler}
        // onSubmitHandler={onSubmitHandlerNew}
        hidden={showDialog === true}
      />
      {/* {showDialog ? (
        <ViewFormWrapper metaData={metaData} formData={formData} />
      ) : null} */}
      {showDialog ? (
        <CAMFormPreviewPage
          onClose={handleCloseDetails}
          isOpen={showDialog}
          row={submitProps}
        />
      ) : null}
    </Fragment>
  );

  return result;
};

export const CC_ODFormWrapper = () => {
  return <CC_ODForm metaData={CC_ODMetaData} />;
};
