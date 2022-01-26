import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Field, Form, Formik } from "formik";
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

const listingOrder = [
  { label: "Recent", value: "recent" },
  { label: "Oldest", value: "old" },
  { label: "Cheapest", value: "cheap" },
  { label: "Most Expensive", value: "exp" },
];

const SearchPage = (props: Props) => {
  // handle search queries
  const router = useRouter();

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
      <Box padding={5}>
        <Formik
          initialValues={{
            subject: router.query.subject,
            level: router.query.level,
            orderBy: null,
            online: !!router.query.online,
            inPerson: !!router.query.inPerson,
          }}
          onSubmit={async (values, { setErrors }) => {
            router.push({ pathname: "/search", query: values });
          }}
          enableReinitialize
        >
          {({ isSubmitting, values }) => (
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
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton _focus={{ outline: 0 }}>
                      <Box flex="1" textAlign={"right"}>
                        Search Filters <ChevronDownIcon />
                      </Box>
                    </AccordionButton>
                    <AccordionPanel>
                      <Grid templateColumns="repeat(3, 1fr)">
                        <GridItem>
                          <Stack>
                            <Text>Mode</Text>
                            <Divider />
                            <Checkbox
                              isChecked={!!router.query.online}
                              onChange={(e) =>
                                router.replace({
                                  pathname: "/search",
                                  query: {
                                    ...router.query,
                                    online: e.target.checked ? true : null,
                                    page: 1,
                                  },
                                })
                              }
                            >
                              Online
                            </Checkbox>
                            <Checkbox
                              isChecked={!!router.query.inPerson}
                              onChange={(e) =>
                                router.replace({
                                  pathname: "/search",
                                  query: {
                                    ...router.query,
                                    inPerson: e.target.checked ? true : null,
                                    page: 1,
                                  },
                                })
                              }
                            >
                              In Person
                            </Checkbox>
                            <HStack>
                              <Text>Region</Text>
                              <Box flex={1}>
                                <Select
                                  instanceId="region"
                                  isClearable
                                  isDisabled={!router.query.inPerson}
                                  options={regionsIsLoading ? [] : regions}
                                  onChange={(selected) => {
                                    router.replace({
                                      pathname: "/search",
                                      query: {
                                        ...router.query,
                                        region: selected?.value,
                                        page: 1,
                                      },
                                    });
                                  }}
                                  size="sm"
                                />
                              </Box>
                            </HStack>
                          </Stack>
                        </GridItem>
                        <GridItem></GridItem>
                        <GridItem>
                          <Stack>
                            <Text>Order By</Text>
                            <Divider />
                            {listingOrder.map((option) =>
                              router.query.order === option.value ||
                              (!router.query.order &&
                                option.value === "recent") ? (
                                <Text fontWeight={"bold"} key={option.value}>
                                  {option.label}
                                </Text>
                              ) : (
                                <Link
                                  key={option.value}
                                  onClick={() =>
                                    router.replace({
                                      pathname: "/search",
                                      query: {
                                        ...router.query,
                                        order: option.value,
                                        page: 1,
                                      },
                                    })
                                  }
                                >
                                  {option.label}
                                </Link>
                              )
                            )}
                          </Stack>
                        </GridItem>
                      </Grid>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Stack>
            </Form>
          )}
        </Formik>
        <ListingDisplay />
      </Box>
    </>
  );
};

export default SearchPage;
