import {
  Flex,
  Heading,
  Stack,
  Text,
  Tag,
  LinkBox,
  LinkOverlay,
  Avatar,
  Button,
  Divider,
  Link,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import listingService from "../../../services/listingService";
import userService from "../../../services/userService";
import { DAY } from "../../../utils/constants";
import useFetch from "../../../utils/useFetch";
import Navbar from "../../components/shared/Navbar";

interface Props {
  listingId: string;
}

const ListingPage = ({ listingId }: Props) => {
  const [isLoading, response, error] = useFetch(() =>
    listingService.getListingById(listingId)
  );
  const listing = response?.data;
  console.log(listing);

  const [currentUserIsLoading, currentUserResponse, currentUserError] =
    useFetch(() => userService.getCurrentUser());

  const currentUser = currentUserResponse?.data;

  return (
    <>
      <Navbar />
      {listing && (
        <Stack padding={5}>
          <Flex alignItems="center" justify="space-between">
            <Flex alignItems="center">
              <Avatar size="2xl" alignItems="center" src={listing.image?.url} />
              <Stack ml={5}>
                <Heading>{listing.title}</Heading>
                <Text>{listing.name}</Text>
              </Stack>
            </Flex>
            {!currentUserIsLoading && currentUser.id === listing.tutor.id && (
              <Link href={`/listing/edit/${listingId}`}>
                <Button>Edit</Button>
              </Link>
            )}
          </Flex>
          <Divider />

          <Heading size="md">Subject(s)</Heading>
          <Flex>
            {listing.subject.map((subject) => (
              <Tag key={subject} mr={2}>
                {subject}
              </Tag>
            ))}
          </Flex>
          <Heading size="md">Level(s)</Heading>
          <Flex>
            {listing.level.map((subject) => (
              <Tag key={subject} mr={2}>
                {subject}
              </Tag>
            ))}
          </Flex>
          <Divider />

          <Heading size="md">Description</Heading>
          <Text>{listing.description}</Text>
          <Divider />

          <Heading size="md">Schedule</Heading>
          {listing.schedule.map(
            (element, index) =>
              element && (
                <HStack key={index}>
                  <Text textTransform={"capitalize"} minWidth={40}>
                    {DAY[index]}
                  </Text>
                  <Text>{element}</Text>
                </HStack>
              )
          )}
          <Divider />

          <Heading size="md">Lesson details</Heading>
          <Text>
            Offers
            <Text as="span" fontWeight={"bold"}>
              {listing.online && " online"}
              {listing.online && listing.inPerson && " and "}
              {listing.inPerson && " in person "}{" "}
            </Text>
            lessons
          </Text>
          <Text>
            Hourly Rate:{" "}
            <Text as="span" fontWeight={"bold"}>
              ${listing.pricing.rate}/hr
            </Text>
          </Text>
          <Text>Rate details: {listing.pricing.details}</Text>
          <Divider />

          <Heading size="md">Contact Information</Heading>
          <Text>{listing.contactInfo}</Text>
          <Divider />
        </Stack>
      )}
    </>
  );
};

ListingPage.getInitialProps = ({ query }) => ({ listingId: query.listingId });

export default ListingPage;
