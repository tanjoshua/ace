import { FormControl, FormLabel } from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { useField } from "formik";
import React from "react";

interface Props {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  formatCreateLabel?: any;
}

const SingleCreateSelect = ({ label, options, ...props }: Props) => {
  const [field, { error }, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <CreatableSelect
        options={options}
        {...props}
        onChange={(selected) => setValue(selected?.value)}
        value={{
          label: field.value,
          value: field.value,
        }}
        isClearable
      />
    </FormControl>
  );
};

export default SingleCreateSelect;
