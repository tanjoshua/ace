import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Stack,
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
    <>
      <FormLabel>{label}</FormLabel>
      <Stack>
        {options.map((option) => (
          <Field name={option.value} key={option.value}>
            {({ field, form }) => {
              return (
                <Box>
                  <FormControl isInvalid={!!form.errors[option.value]}>
                    <FormErrorMessage>
                      {form.errors[option.value]}
                    </FormErrorMessage>
                    <Checkbox {...field} isChecked={field.value}>
                      {option.label}
                    </Checkbox>
                  </FormControl>
                </Box>
              );
            }}
          </Field>
        ))}
      </Stack>
    </>
  );
};

export default CheckboxInput;
