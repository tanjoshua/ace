import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { Field, FieldArray, useField } from "formik";
import React from "react";

interface Props {
  label: string;
  options: { label: string; value: string }[];
}

const CheckboxInput = ({ label, options, ...props }: Props) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <HStack>
        {options.map((option) => (
          <Field name={option.value}>
            {({ field, form }) => (
              <Checkbox {...field}>{option.label}</Checkbox>
            )}
          </Field>
        ))}
      </HStack>
    </FormControl>
  );
};

export default CheckboxInput;
