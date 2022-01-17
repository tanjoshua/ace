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
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import listingService from "../../services/listingService";
import useFetch from "../../utils/useFetch";
import ListingBox from "./ListingBox";

interface Props {}

const ListingDisplay = ({}: Props) => {
  const router = useRouter();

  const [totalPages, setTotalPages] = useState(1);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      let response;

      try {
        response = await listingService.getListings({ ...router.query });
      } catch (e) {
        setIsLoading(false);
        return;
      }

      setListings(response.data.listings);
      setTotalPages(Math.ceil(response.data.count / 5));
      setIsLoading(false);
    };

    fetchListings();
  }, [router.query]);

  if (isLoading) {
    return <></>;
  }
  // console.log(listings);
  return (
    <Stack>
      {listings.map((listing) => (
        <ListingBox listing={listing} key={listing.id} />
      ))}
      <Flex align={"center"}>
        <Text>Page </Text>
        <NumberInput
          size="sm"
          maxW={20}
          min={1}
          max={totalPages}
          defaultValue={(router.query.page as string) || 1}
          mx={2}
          onChange={(value) => {
            router.push({
              pathname: "/search",
              query: {
                ...router.query,
                page: parseInt(value),
              },
            });
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
