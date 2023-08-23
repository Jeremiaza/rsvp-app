import React from "react";
import PropTypes from "prop-types";
import "./CustomInput.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";


export default function CustomInput(props) {
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    handleChange,
    type,
    value
  } = props;

  return (
    <FormControl {...formControlProps} className={"login-form"}>
      {labelText !== undefined ? (
        <InputLabel
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        id={id}
        onChange={handleChange}
        {...inputProps}
        type={type}
        value={value}
      />
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool
};
