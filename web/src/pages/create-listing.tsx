import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Router from "next/router";
import React, { useEffect } from "react";
import listingService from "../../services/listingService";
import userService from "../../services/userService";
import { toErrorMap } from "../../utils/toErrorMap";
import useFetch from "../../utils/useFetch";
import CreateSelect from "../components/shared/CreateSelect";
import InputField from "../components/shared/InputField";
import Multiselect from "../components/shared/Multiselect";

import Navbar from "../components/shared/Navbar";

interface Props {}

const createListing = (props: Props) => {
  const [isLoading, response, error] = useFetch(() =>
    userService.getCurrentUser()
  );
  const isLoggedIn = !!response?.data;
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      Router.replace("/login");
    }
  }, [isLoading, isLoggedIn]);

  const [levelsIsLoading, levelsResponse, levelsError] = useFetch(() =>
    listingService.getLevels()
  );
  const levels = levelsResponse?.data.levels.map((x: string) => ({
    value: x,
    label: x,
  }));
  const [subjectsIsLoading, subjectsResponse, subjectsError] = useFetch(() =>
    listingService.getSubjects()
  );
  const subjects = subjectsResponse?.data.subjects.map((x: string) => ({
    value: x,
    label: x,
  }));

  return (
    <>
      <Navbar />
      <Stack padding={5}>
        <Formik
          initialValues={{
            title: "",
            pricing: "",
            level: [],
            subject: [],
            contactInfo: "",
            description: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            try {
              console.log(values);
              const response = await listingService.createListing(values);
              const id = response.data.id;
              Router.push(`/listing/${id}`);
            } catch (error) {
              if (error.response?.status === 401) {
                // redirect
                Router.replace("/login");
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
              <Stack>
                <InputField name="title" placeholder="Title" label="Title" />
                <Multiselect
                  options={levelsIsLoading ? [] : levels}
                  name="level"
                  label="Level(s)"
                />
                <CreateSelect
                  options={subjectsIsLoading ? [] : subjects}
                  name="subject"
                  label="Subject(s)"
                />
                <InputField
                  name="contactInfo"
                  placeholder="Let your potential students know how they can contact you."
                  label="Contact Information"
                  textarea
                />
                <InputField
                  name="pricing"
                  placeholder="Describe your fee structure. Example: $X/hr in person, $Y/hr virtual"
                  label="Pricing"
                  textarea
                />
                <InputField
                  name="description"
                  placeholder="Type anything you want your potential students to know about you."
                  label="Description"
                  textarea
                />

                <Button type="submit" isLoading={isSubmitting}>
                  Create
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </>
  );
};

export default createListing;
