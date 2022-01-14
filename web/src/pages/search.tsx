import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import listingService from "../../services/listingService";
import makeArray from "../../utils/makeArray";
import useFetch from "../../utils/useFetch";
import SingleCreateSelect from "../components/inputs/SingleCreateSelect";
import SingleSelect from "../components/inputs/SingleSelect";
import ListingDisplay from "../components/ListingDisplay";
import Navbar from "../components/shared/Navbar";

interface Props {}

const SearchPage = (props: Props) => {
  // handle search queries
  const router = useRouter();
  const subjectQuery = router.query.subject;
  const levelQuery = router.query.level;

  // load suggested level and subjects
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
      <Box padding={5}>
        <Formik
          initialValues={{
            subject: subjectQuery,
            level: levelQuery,
          }}
          onSubmit={async (values, { setErrors }) => {
            router.push({ pathname: "/search", query: values });
          }}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack>
                <HStack alignItems="flex-end">
                  <SingleCreateSelect
                    options={subjectsIsLoading ? [] : subjects}
                    name="subject"
                    label="Search for subject or search terms"
                    formatCreateLabel={(inputValue) => {
                      return `Search for ${inputValue}`;
                    }}
                  />
                  <SingleSelect
                    options={levelsIsLoading ? [] : levels}
                    name="level"
                    label="Level"
                  />
                  <Box>
                    <Button type="submit" leftIcon={<SearchIcon />}>
                      Search
                    </Button>
                  </Box>
                </HStack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      <ListingDisplay />
    </>
  );
};

export default SearchPage;
