import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import listingService from "../../../../services/listingService";
import redirectIfNotAuth from "../../../../utils/redirectIfNotAuth";
import redirectIfNotUser from "../../../../utils/redirectIfNotUser";
import { toErrorMap } from "../../../../utils/toErrorMap";
import useFetch from "../../../../utils/useFetch";
import CreateSelect from "../../../components/inputs/CreateSelect";
import ImageUpload from "../../../components/inputs/ImageUpload";
import InputField from "../../../components/inputs/InputField";
import Multiselect from "../../../components/inputs/Multiselect";
import PricingInput from "../../../components/inputs/PricingInput";

import Navbar from "../../../components/shared/Navbar";

interface Props {
  listingId: string;
}

const EditListing = ({ listingId }: Props) => {
  const router = useRouter();

  // fetch listing data
  const [listingIsLoading, listingResponse, listingError] = useFetch(() =>
    listingService.getListingById(listingId)
  );
  const listing = listingResponse?.data;

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
      {listing && (
        <Stack padding={5}>
          <Formik
            initialValues={{
              image: null,
              title: listing.title,
              name: listing.name,
              pricing: listing.pricing.rate,
              pricingDetails: listing.pricing.details,
              level: listing.level,
              subject: listing.subject,
              contactInfo: listing.contactInfo,
              description: listing.description,
            }}
            onSubmit={async (values, { setErrors }) => {
              try {
                // exclude images
                const { image, ...listingValues } = values;
                const response = await listingService.updateListing(
                  listingId,
                  listingValues
                );
                const id = response.data.id;

                // upload image
                if (image) {
                  const imageResponse = await listingService.uploadListingImage(
                    id,
                    image
                  );
                }

                router.push(`/listing/${listingId}`);
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
                  <ImageUpload name="image" defaultImage={listing.image?.url} />
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
                    Edit Listing
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      )}
    </>
  );
};

EditListing.getInitialProps = ({ query }) => ({ listingId: query.listingId });

export default EditListing;
