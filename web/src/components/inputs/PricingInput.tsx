import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type Props = {
  label: string;
  name: string;
};

const PricingInput = ({ label, ...props }: Props) => {
  const [field, { error }, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <NumberInput
        id={field.name}
        min={0}
        onChange={(value) => setValue(parseInt(value))}
        value={field.value}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default PricingInput;
