import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { FieldProps, getIn } from "formik";
import { FC } from "react";

const TextField: FC<FieldProps & TextFieldProps> = (props) => {
  const isTouched = getIn(props?.form?.touched, props.field?.name);
  const errorMessage = getIn(props?.form?.errors, props.field?.name);

  const { error, helperText, field, form, ...rest } = props;

  return (
    <MuiTextField
      error={error ?? !!(isTouched && errorMessage)}
      helperText={
        helperText ?? (isTouched && errorMessage ? errorMessage : undefined)
      }
      size="small"
      fullWidth
      {...rest}
      {...field}
    />
  );
};

export default TextField;
