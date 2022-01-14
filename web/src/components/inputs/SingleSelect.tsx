import { FormControl, FormLabel } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useField } from "formik";
import React from "react";

interface Props {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}

const SingleSelect = ({ label, options, ...props }: Props) => {
  const [field, { value }, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select
        options={options}
        {...props}
        onChange={(selected) => setValue(selected?.value)}
        value={options.find((option) => field.value === option.value)}
        isClearable
      />
    </FormControl>
  );
};

export default SingleSelect;
