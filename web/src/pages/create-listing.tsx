import { Button, Stack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import listingService from "../../services/listingService";
import redirectIfNotAuth from "../../utils/redirectIfNotAuth";
import { toErrorMap } from "../../utils/toErrorMap";
import useFetch from "../../utils/useFetch";
import CheckboxInput from "../components/inputs/CheckboxInput";
import CreateSelect from "../components/inputs/CreateSelect";
import ImageUpload from "../components/inputs/ImageUpload";
import InputField from "../components/inputs/InputField";
import Multiselect from "../components/inputs/Multiselect";
import PricingInput from "../components/inputs/PricingInput";
import ScheduleInput from "../components/inputs/ScheduleInput";

import Navbar from "../components/shared/Navbar";

interface Props {}

const initialSchedule1 = [
  { day: "monday", value: null },
  { day: "tuesday", value: null },
  { day: "wednesday", value: null },
  { day: "thursday", value: null },
  { day: "friday", value: null },
  { day: "saturday", value: null },
  { day: "sunday", value: null },
];

const initialSchedule = [null, null, null, null, null, null, null];

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
  const [regionsIsLoading, regionsResponse, regionsError] = useFetch(() =>
    listingService.getRegions()
  );
  const regions = regionsResponse?.data.regions.map((x: string) => ({
    value: x,
    label: x,
  }));

  return (
    <>
      <Navbar />
      <Stack padding={5}>
        <Formik
          initialValues={{
            image: null,
            title: "",
            name: "",
            pricing: "",
            pricingDetails: "",
            level: [],
            subject: [],
            contactInfo: "",
            description: "",
            schedule: initialSchedule,
            online: false,
            inPerson: false,
            regions: [],
          }}
          onSubmit={async (values, { setErrors }) => {
            try {
              // exclude images
              const { image, ...listingValues } = values;
              console.log(listingValues);
              const response = await listingService.createListing(
                listingValues
              );
              const id = response.data.id;
              console.log(image);

              // upload image
              if (image) {
                const imageResponse = await listingService.uploadListingImage(
                  id,
                  image
                );
                console.log(imageResponse);
              }

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
          {({ isSubmitting, values }) => (
            <Form>
              <Stack>
                <ImageUpload name="image" />
                <InputField
                  name="title"
                  placeholder="Headline to grab attention"
                  label="Title"
                />
                <InputField
                  name="name"
                  placeholder="Name of tutor"
                  label="Name"
                />
                <CreateSelect
                  options={subjectsIsLoading ? [] : subjects}
                  name="subject"
                  label="Subject(s)"
                />
                <Multiselect
                  options={levelsIsLoading ? [] : levels}
                  name="level"
                  label="Level(s)"
                />
                <InputField
                  name="description"
                  placeholder="Tell your potential students more about yourself."
                  label="Description"
                  textarea
                />
                <CheckboxInput
                  label="Mode of Instruction"
                  options={[
                    { label: "Online", value: "online" },
                    { label: "In Person", value: "inPerson" },
                  ]}
                />
                <Multiselect
                  options={regionsIsLoading ? [] : regions}
                  name="regions"
                  label="Region(s)"
                  isDisabled={!values.inPerson}
                />
                <ScheduleInput name="schedule" label="Schedule" />
                <PricingInput name="pricing" label="Pricing /hr" />
                <InputField
                  name="pricingDetails"
                  placeholder="Elaborate on any details with regards to your fee structure. Eg: group rate, cancellation policy, etc."
                  label="Pricing Details"
                  textarea
                />
                <InputField
                  name="contactInfo"
                  placeholder="Let your potential students know how they can contact you."
                  label="Contact Information"
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
