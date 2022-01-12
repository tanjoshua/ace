import {
  Flex,
  Heading,
  Stack,
  Text,
  Tag,
  LinkBox,
  LinkOverlay,
  Avatar,
} from "@chakra-ui/react";
import React from "react";
import listingService from "../../../services/listingService";
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

  return (
    <>
      <Navbar />
      {listing && (
        <Stack padding={5}>
          <Flex alignItems="center">
            <Avatar size="2xl" />
            <Stack ml={5}>
              <Heading>{listing.title}</Heading>
              <Text>{listing.name}</Text>
            </Stack>
          </Flex>
          <Heading>{listing.title}</Heading>
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
          <Heading size="md">Description</Heading>
          <Text>{listing.description}</Text>
          <Heading size="md">Pricing</Heading>
          <Text>{listing.pricing}</Text>
          <Heading size="md">Contact Information</Heading>
          <Text>{listing.contactInfo}</Text>
          <Heading size="md">About The Tutor</Heading>
          <LinkBox p={5} shadow="md" borderWidth="1px">
            <LinkOverlay href={`/user/${listing.tutor.id}`}>
              <Heading size="sm">{listing.tutor.name}</Heading>
            </LinkOverlay>
          </LinkBox>
        </Stack>
      )}
    </>
  );
};

ListingPage.getInitialProps = ({ query }) => ({ listingId: query.listingId });

export default ListingPage;
