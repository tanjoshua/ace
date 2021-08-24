import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";

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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default register;
