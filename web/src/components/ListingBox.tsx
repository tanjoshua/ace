import {
  LinkBox,
  LinkOverlay,
  Heading,
  Flex,
  Tag,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const ListingBox = ({ listing }) => {
  return (
    <LinkBox p={5} shadow="md" borderWidth="1px" key={listing.id}>
      <LinkOverlay href={`/listing/${listing.id}`}>
        <Heading fontSize="xl">{listing.title}</Heading>
      </LinkOverlay>
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
      <Link href={`/user/${listing.tutor.id}`}>
        <Text fontSize="sm" color="gray.600" mt={2}>
          Listed by: {listing.tutor.name}
        </Text>
      </Link>

      <Text mt={2}>{listing.description}</Text>
    </LinkBox>
  );
};

export default ListingBox;
