import React from "react";
import { Form, Formik } from "formik";
import InputField from "../components/inputs/InputField";
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

import authService from "../../services/authService";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
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
              to manage your listing
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
                  if (typeof router.query.next === "string") {
                    router.push(router.query.next || "/");
                  } else {
                    router.push("/");
                  }
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
                    <InputField
                      name="email"
                      placeholder="Email"
                      label="Email"
                      type="email"
                    />
                    <InputField
                      name="password"
                      placeholder="Password"
                      label="Password"
                      type="password"
                    />
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        justify={"space-between"}
                        alignItems={"center"}
                      >
                        <NextLink href={`/register?next=${router.query.next}`}>
                          <Button variant={"link"}>Create account</Button>
                        </NextLink>
                        <NextLink href="/forgot-password">
                          <Link color={"blue.400"}>Forgot password?</Link>
                        </NextLink>
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
