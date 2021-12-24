import { FormControl, FormLabel } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useField } from "formik";
import React from "react";

interface Props {
  label: string;
  name: string;
  options: string[];
}

const Multiselect = ({ label, options, ...props }: Props) => {
  const [field, { error }, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select
        isMulti
        options={options}
        {...props}
        onChange={(selected) => setValue(selected.map((x) => x.value))}
      />
    </FormControl>
  );
};

export default Multiselect;
