import {
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import authService from "../../../services/authService";
import { toErrorMap } from "../../../utils/toErrorMap";
import InputField from "../../components/shared/InputField";
import Navbar from "../../components/shared/Navbar";

const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
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
        <Formik
          initialValues={{ password: "" }}
          onSubmit={async (values, { setErrors }) => {
            try {
              await authService.resetPassword({ ...values, token });
              router.push("/");
            } catch (error) {
              if (error.response?.status === 404) {
                setErrors({
                  password: error.response.data.message,
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
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                  Enter new password
                </Heading>
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
                <Stack spacing={6}>
                  <Button type="submit" isLoading={isSubmitting}>
                    Change Password
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
    </>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return { token: query.token as string };
};

export default ResetPassword;
