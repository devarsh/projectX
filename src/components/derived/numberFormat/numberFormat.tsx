import NumberFormat, { NumberFormatProps } from "react-number-format";
import { TextField, TextFieldProps } from "components/common/textField";
import { Merge } from "components/common/types";

function NumberFormatCustom(props) {
  const { inputRef, onChange, FormatProps, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      {...FormatProps}
    />
  );
}

interface extendedProps {
  FormatProps: NumberFormatProps;
}

export type AllNumberFormatProps = Merge<TextFieldProps, extendedProps>;

const MyNumberFormat: React.FC<AllNumberFormatProps> = ({
  FormatProps,
  ...others
}) => {
  return (
    <TextField
      {...others}
      InputProps={{
        inputComponent: NumberFormatCustom,
        inputProps: { FormatProps: FormatProps },
      }}
    />
  );
};

export default MyNumberFormat;
