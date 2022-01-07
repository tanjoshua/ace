import {
  Box,
  Flex,
  Heading,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Tag,
  Text,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import listingService from "../../services/listingService";
import useFetch from "../../utils/useFetch";

interface Props {}

const ListingDisplay = ({}: Props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      let response;

      try {
        response = await listingService.getListings({ page });
      } catch (e) {
        setIsLoading(false);
        return;
      }

      setListings(response.data.listings);
      setTotalPages(Math.ceil(response.data.count / limit));
      setIsLoading(false);
    };

    fetchListings();
  }, [page, limit]);

  if (isLoading) {
    return <></>;
  }
  console.log(listings);
  return (
    <Stack padding={5}>
      {listings.map((listing) => (
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
      ))}
      <Flex align={"center"}>
        <Text>Page </Text>
        <NumberInput
          size="sm"
          maxW={20}
          min={1}
          max={totalPages}
          defaultValue={page}
          mx={2}
          onChange={(value) => {
            setPage(parseInt(value));
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text>of {totalPages}</Text>
      </Flex>
    </Stack>
  );
};

export default ListingDisplay;
