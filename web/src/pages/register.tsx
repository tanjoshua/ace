import React from "react";
import { Form, Formik } from "formik";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Navbar from "../components/shared/Navbar";
import InputField from "../components/shared/InputField";
import authService from "../../services/auth";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";

interface Props {}

const register = (props: Props) => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Create an account with Ace</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to start finding students
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                try {
                  await authService.register(values);
                  router.push("/");
                } catch (error) {
                  const errors = error.response?.data?.errors;
                  if (errors) {
                    setErrors(toErrorMap(errors));
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing={4}>
                    <Box>
                      <InputField name="name" placeholder="Name" label="Name" />
                    </Box>
                    <Box>
                      <InputField
                        name="email"
                        placeholder="Email"
                        label="Email"
                        type="email"
                      />
                    </Box>
                    <Box>
                      <InputField
                        name="password"
                        placeholder="Password"
                        label="Password"
                        type="password"
                      />
                    </Box>
                    <Button type="submit" isLoading={isSubmitting}>
                      Register
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default register;
