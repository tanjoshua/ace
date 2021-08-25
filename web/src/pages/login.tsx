import React from "react";
import { Form, Formik } from "formik";
import InputField from "../components/shared/InputField";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Checkbox,
  Link,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

import authService from "../../services/auth";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import Navbar from "../components/shared/Navbar";

interface Props {}

const login = (props: Props) => {
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
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to manage your listings️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                try {
                  await authService.login(values);
                  router.push("/");
                } catch (error) {
                  if (error.response?.status === 401) {
                    setErrors({
                      email: "Invalid credentials",
                      password: "Invalid credentials",
                    });
                  } else {
                    const errors = error.response?.data?.errors;
                    if (errors) {
                      setErrors(toErrorMap(errors));
                    }
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing={4}>
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
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Checkbox>Remember me</Checkbox>
                        <Link color={"blue.400"}>Forgot password?</Link>
                      </Stack>
                      <Button type="submit" isLoading={isSubmitting}>
                        Login
                      </Button>
                    </Stack>
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

export default login;
