import React from "react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import authService from "../../services/auth";

interface Props {}

const register = (props: Props) => {
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={async (values) => {
        return authService.register(values);
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
  );
};

export default register;
