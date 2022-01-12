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
} from "@chakra-ui/react";
import React from "react";
import listingService from "../../../services/listingService";
import userService from "../../../services/userService";
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
              <Avatar size="2xl" alignItems="center" />
              <Stack ml={5}>
                <Heading>{listing.title}</Heading>
                <Text>{listing.name}</Text>
              </Stack>
            </Flex>
            {!currentUserIsLoading && currentUser.id === listing.tutor.id && (
              <Button>Edit</Button>
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

          <Heading size="md">Pricing</Heading>
          <Text>{listing.pricing.rate}/hr</Text>
          <Text>{listing.pricing.details}</Text>
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
