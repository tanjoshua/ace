import {
  Box,
  Button,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import listingService from "../../services/listingService";
import useFetch from "../../utils/useFetch";
import Navbar from "../components/shared/Navbar";

type Props = {};

const BeginPage = (props: Props) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(1);

  // load suggested level and subjects
  const [levelsIsLoading, levelsResponse, levelsError] = useFetch(() =>
    listingService.getLevels()
  );
  const levels = levelsResponse?.data.levels;
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
  const regions = regionsResponse?.data.regions;

  return (
    <>
      <Navbar />
      <Stack>
        <Formik
          initialValues={{
            subject: router.query.subject,
            online: false,
            inPerson: false,
            level: null,
            region: null,
          }}
          onSubmit={(values) => {
            router.replace({ pathname: "/search", query: values });
          }}
        >
          {({ values, setFieldValue, submitForm }) => (
            <Form>
              <Box minW="3xl" alignSelf={"center"}>
                <Tabs
                  index={tabIndex}
                  onChange={(index) => setTabIndex(tabIndex)}
                >
                  <TabList hidden>
                    <Tab>Subject</Tab>
                    <Tab>Mode</Tab>
                    <Tab>Region</Tab>
                    <Tab>Level</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Flex
                        direction={"column"}
                        rounded="lg"
                        boxShadow={"lg"}
                        p={5}
                      >
                        Subject
                        <Box alignSelf={"end"}>
                          <Button onClick={() => setTabIndex(1)}>Next</Button>
                        </Box>
                      </Flex>
                    </TabPanel>
                    <TabPanel>
                      <Stack rounded="lg" boxShadow={"lg"} p={5}>
                        <Text>
                          Are you looking for online or in person tutoring?
                        </Text>
                        <Button
                          variant={"outline"}
                          onClick={() => {
                            setFieldValue("online", true);
                            setTabIndex(tabIndex + 2);
                          }}
                        >
                          Online
                        </Button>
                        <Button
                          variant={"outline"}
                          onClick={() => {
                            setFieldValue("inPerson", true);
                            setTabIndex(tabIndex + 1);
                          }}
                        >
                          In person
                        </Button>
                        <Button
                          variant={"outline"}
                          onClick={() => {
                            setFieldValue("inPerson", true);
                            setFieldValue("online", true);
                            setTabIndex(tabIndex + 1);
                          }}
                        >
                          Both
                        </Button>
                        <Flex justifyContent={"space-between"}>
                          <Button
                            onClick={() => setTabIndex(tabIndex - 1)}
                            variant="link"
                            visibility={"hidden"} // hide for now
                          >
                            {"< Back"}
                          </Button>
                          <Button
                            onClick={() => setTabIndex(tabIndex + 2)}
                            variant="link"
                          >
                            {"Skip >"}
                          </Button>
                        </Flex>
                      </Stack>
                    </TabPanel>
                    <TabPanel>
                      <Stack rounded="lg" boxShadow={"lg"} p={5}>
                        <Text>
                          In what region of Singapore do you want in person
                          lessons?
                        </Text>
                        {regions &&
                          regions.map((region) => (
                            <Button
                              variant="outline"
                              onClick={() => {
                                setFieldValue("region", region);
                                setTabIndex(tabIndex + 1);
                              }}
                            >
                              {region}
                            </Button>
                          ))}
                        <Flex justifyContent={"space-between"}>
                          <Button
                            onClick={() => setTabIndex(tabIndex - 1)}
                            variant="link"
                          >
                            {"< Back"}
                          </Button>
                          <Button
                            onClick={() => setTabIndex(tabIndex + 1)}
                            variant="link"
                          >
                            {"Skip >"}
                          </Button>
                        </Flex>
                      </Stack>
                    </TabPanel>
                    <TabPanel>
                      <Stack rounded="lg" boxShadow={"lg"} p={5}>
                        {levels &&
                          levels.map((level) => (
                            <Button
                              variant="outline"
                              onClick={() => {
                                setFieldValue("level", level);
                                submitForm();
                              }}
                            >
                              {level}
                            </Button>
                          ))}
                        <Flex justifyContent={"space-between"}>
                          <Button
                            onClick={() => {
                              setTabIndex(
                                values.region ? tabIndex - 1 : tabIndex - 2
                              );
                            }}
                            variant="link"
                          >
                            {"< Back"}
                          </Button>
                          <Button type="submit" variant="link">
                            {"Skip > "}
                          </Button>
                        </Flex>
                      </Stack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Form>
          )}
        </Formik>
      </Stack>
    </>
  );
};

export default BeginPage;
