import {
  Box,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Tag,
  Text,
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
      const response = await listingService.getListings({ page });
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
    <Stack padding={2}>
      {listings.map((listing) => (
        <Box p={5} shadow="md" borderWidth="1px" key={listing.id}>
          <Heading fontSize="xl">{listing.title}</Heading>
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
          <Text mt={2}>{listing.description}</Text>
        </Box>
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
        <Text>{`of ${totalPages}`}</Text>
      </Flex>
    </Stack>
  );
};

export default ListingDisplay;
