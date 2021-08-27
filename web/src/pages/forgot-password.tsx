import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import React, { useState } from "react";
import authService from "../../services/authService";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../components/shared/InputField";
import Navbar from "../components/shared/Navbar";

interface Props {}

const forgotPassword = (props: Props) => {
  const [isDone, setIsDone] = useState(false);
  return (
    <>
      <Navbar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values, { setErrors }) => {
            try {
              await authService.forgotPassword(values);
              setIsDone(true);
            } catch (error) {
              const errors = error.response?.data?.errors;
              if (errors) {
                setErrors(toErrorMap(errors));
              }
            }
          }}
        >
          {({ isSubmitting }) =>
            isDone ? (
              <Heading fontSize={"4xl"}>
                Please check your email for the link
              </Heading>
            ) : (
              <Form>
                <Stack
                  spacing={4}
                  w={"full"}
                  maxW={"md"}
                  bg={useColorModeValue("white", "gray.700")}
                  rounded={"xl"}
                  boxShadow={"lg"}
                  p={6}
                  my={12}
                >
                  <Heading fontSize={"4xl"}>Forgot your password?</Heading>
                  <Text fontSize={"lg"}>
                    You'll get an email with a reset link
                  </Text>
                  <InputField
                    name="email"
                    placeholder="Email"
                    label="Email"
                    type="email"
                  />
                  <Stack spacing={6}>
                    <Button type="submit" isLoading={isSubmitting}>
                      Request Reset
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )
          }
        </Formik>
      </Flex>
    </>
  );
};

export default forgotPassword;
