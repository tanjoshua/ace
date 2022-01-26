import { SearchIcon } from "@chakra-ui/icons";
import {
  Container,
  Stack,
  Heading,
  Button,
  Flex,
  Text,
  Box,
  HStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import router from "next/router";
import listingService from "../../services/listingService";
import userService from "../../services/userService";
import useFetch from "../../utils/useFetch";
import SingleCreateSelect from "../components/inputs/SingleCreateSelect";
import Navbar from "../components/shared/Navbar";

const Index = () => {
  const [isLoading, response, error] = useFetch(() =>
    userService.getCurrentUser()
  );
  const isLoggedIn = !!response?.data;
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
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pt={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Finding private tutors{" "}
            <Text as={"span"} color={"pink.400"}>
              made easy
            </Text>
          </Heading>
          <Text>
            Find the best private tutors in Singapore for any subject of your
            choice. Meet online or in-person. We do not charge any commissions
            or platform fees, making things as affordable as possible for both
            the tutor and the student.
          </Text>
          <Box>
            <Formik
              initialValues={{ subject: "" }}
              onSubmit={(values) => {
                router.push({ pathname: "/search", query: values });
              }}
              enableReinitialize
            >
              {() => (
                <Form>
                  <HStack alignItems="flex-end">
                    <SingleCreateSelect
                      options={subjectsIsLoading ? [] : subjects}
                      name="subject"
                      label="What subject do you need help with?"
                      formatCreateLabel={(inputValue) => {
                        return `Search for ${inputValue}`;
                      }}
                    />
                    <Box>
                      <Button type="submit" leftIcon={<SearchIcon />}>
                        Search
                      </Button>
                    </Box>
                  </HStack>
                </Form>
              )}
            </Formik>
          </Box>
          {response && !isLoggedIn && (
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <Link href="/register?next=/create-listing">
                <Button
                  size="lg"
                  colorScheme={"pink"}
                  bg={"pink.400"}
                  rounded={"full"}
                  px={6}
                  _hover={{
                    bg: "pink.300",
                  }}
                >
                  I'm a tutor
                </Button>
              </Link>
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Index;
