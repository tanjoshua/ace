import {
  LinkBox,
  LinkOverlay,
  Heading,
  Flex,
  Tag,
  Text,
  Avatar,
  Box,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const ListingBox = ({ listing }) => {
  return (
    <LinkBox p={5} shadow="md" borderWidth="1px" key={listing.id}>
      <Flex alignItems="center">
        <Avatar size="lg" alignItems="center" src={listing.image?.url} />
        <Box ml={5}>
          <LinkOverlay href={`/listing/${listing.id}`}>
            <Heading fontSize="xl">{listing.title}</Heading>
          </LinkOverlay>
          <Text>{listing.name}</Text>
        </Box>
      </Flex>

      <Flex mt={2}>
        {listing.subject.map((subject) => (
          <Tag key={subject} mr={2}>
            {subject}
          </Tag>
        ))}
      </Flex>
      <Flex mt={2}>
        {listing.level.map((level) => (
          <Tag key={level} mr={2}>
            {level}
          </Tag>
        ))}
      </Flex>
      <Divider mt={2} />
      <Box mt={2}>
        <Text>
          Offers
          {listing.online && " online"}
          {listing.online && listing.inPerson && " and "}
          {listing.inPerson && " in person "} lessons
          {listing.inPerson &&
            listing.regions &&
            listing.regions.length > 0 &&
            ` in the ${listing.regions.join(", ")} region${
              listing.regions.length > 1 ? "s" : ""
            }`}
        </Text>
        <Text>${listing.pricing.rate}/hr</Text>
      </Box>
      <Divider mt={2} />

      <Text mt={2} noOfLines={3}>
        {listing.description}
      </Text>
    </LinkBox>
  );
};

export default ListingBox;
