import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

const InputField = ({ label, textarea, size: _, ...props }: Props) => {
  const [field, { error }, helpers] = useField(props);

  let InputDisplay: any = Input
  if (textarea) {
    InputDisplay = Textarea
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputDisplay
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
