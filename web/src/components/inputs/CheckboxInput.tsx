import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { FieldArray, useField } from "formik";
import React from "react";

interface Props {
  label: string;
  name: string;
  options: { label: string; value: string }[];
}

const CheckboxInput = ({ label, options, ...props }: Props) => {
  const [field, { error }, helpers] = useField(props);
  const { setValue } = helpers;
  console.log(field.value);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <CheckboxGroup {...field} {...props}>
        <HStack>
          <FieldArray
            {...props}
            render={({ insert, remove, push }) =>
              options.map((option) => (
                <Checkbox
                  name={field.name}
                  checked={field.value.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      push(option.value);
                    } else {
                      remove(field.value.indexOf(option.value));
                    }
                  }}
                >
                  {option.label}
                </Checkbox>
              ))
            }
          ></FieldArray>
        </HStack>
      </CheckboxGroup>
    </FormControl>
  );
};

export default CheckboxInput;
