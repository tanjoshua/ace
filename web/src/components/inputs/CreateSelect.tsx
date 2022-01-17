import { FormControl, FormLabel } from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { useField } from "formik";
import React from "react";

interface Props {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}

const CreateSelect = ({ label, options, ...props }: Props) => {
  const [field, { error }, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <CreatableSelect
        isMulti
        options={options}
        {...props}
        onChange={(selected) => setValue(selected.map((x) => x.value))}
        value={field.value.map((x) => ({ value: x, label: x }))}
      />
    </FormControl>
  );
};

export default CreateSelect;
