import React from "react";
import { Form, Formik } from "formik";
import InputField from "../components/shared/InputField";
import { Box, Button } from "@chakra-ui/react";

import authService from "../../services/auth";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";

interface Props {}

const login = (props: Props) => {
  const router = useRouter();

  return (
    <>
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default login;
