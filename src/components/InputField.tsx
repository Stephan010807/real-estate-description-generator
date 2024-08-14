// src/components/InputField.tsx
import { TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";

interface InputFieldProps extends Omit<TextFieldProps, "name" | "label"> {
  name: string;
  label: string;
  control: any;
}

export default function InputField({
  name,
  label,
  control,
  ...textFieldProps
}: InputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          {...textFieldProps}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}
