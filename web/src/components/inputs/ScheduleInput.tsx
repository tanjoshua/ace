import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import React, { useState } from "react";
import { DAY } from "../../../utils/constants";

interface Props {
  label: string;
  name: string;
}

const ScheduleInput = ({ label, ...props }: Props) => {
  const [field, { error }, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <FieldArray {...props}>
        {({ insert, remove, push }) => (
          <Stack>
            {field.value.map((element, index) => {
              return (
                <HStack>
                  <Text textTransform={"capitalize"} minWidth={40}>
                    {DAY[index]}
                  </Text>
                  {element !== null ? (
                    <InputGroup>
                      <Input
                        placeholder="Eg. 9:00am - 5:00pm"
                        name={`${field.name}.${index}`}
                        onChange={(e) => {
                          field.value[index] = e.target.value;
                          setValue(field.value);
                        }}
                        value={field.value[index]}
                      ></Input>
                      <InputRightElement>
                        <CloseButton
                          onClick={() => {
                            insert(index, null);
                            remove(index + 1);
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                  ) : (
                    <Button
                      leftIcon={<AddIcon />}
                      onClick={() => {
                        insert(index, "");
                        remove(index + 1);
                      }}
                    >
                      Add availability
                    </Button>
                  )}
                </HStack>
              );
            })}
          </Stack>
        )}
      </FieldArray>
    </FormControl>
  );
};

export default ScheduleInput;
