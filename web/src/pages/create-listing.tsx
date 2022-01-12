import { Avatar, Button, Stack, Image } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import listingService from "../../services/listingService";
import redirectIfNotAuth from "../../utils/redirectIfNotAuth";
import { toErrorMap } from "../../utils/toErrorMap";
import useFetch from "../../utils/useFetch";
import CreateSelect from "../components/shared/CreateSelect";
import ImageUpload from "../components/shared/ImageUpload";
import InputField from "../components/shared/InputField";
import Multiselect from "../components/shared/Multiselect";

import Navbar from "../components/shared/Navbar";

interface Props {}

const createListing = (props: Props) => {
  const router = useRouter();
  redirectIfNotAuth();

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
            picture: null,
            title: "",
            name: "",
            pricing: "",
            level: [],
            subject: [],
            contactInfo: "",
            description: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            try {
              // exclude images
              const { picture, ...listingValues } = values;
              console.log(listingValues);
              const response = await listingService.createListing(
                listingValues
              );
              const id = response.data.id;

              // upload image
              const imageResponse = await listingService.uploadListingImage(
                id,
                picture
              );

              router.push(`/listing/${id}`);
            } catch (error) {
              if (error.response?.status === 401) {
                // redirect
                router.replace(`/login?next=${router.pathname}`);
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
                <ImageUpload name="picture" />
                <InputField
                  name="title"
                  placeholder="Brief description"
                  label="Title"
                />
                <InputField
                  name="name"
                  placeholder="Name of tutor"
                  label="Name"
                />
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
