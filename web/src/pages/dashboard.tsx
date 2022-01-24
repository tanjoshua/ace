import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

import userService from "../../services/userService";
import redirectIfNotAuth from "../../utils/redirectIfNotAuth";
import useFetch from "../../utils/useFetch";
import ListingBox from "../components/ListingBox";
import Navbar from "../components/shared/Navbar";

interface Props {}

const UserPage = ({}: Props) => {
  redirectIfNotAuth();

  const [isLoading, response, error] = useFetch(() =>
    userService.getCurrentUserDetails()
  );
  const currentUser = response?.data;
  console.log(currentUser);

  return (
    <>
      <Navbar />
      <Stack padding={5}>
        <Heading size="lg">My Listing</Heading>
        {currentUser &&
          currentUser.listings.map((listing) => (
            <ListingBox listing={listing} key={listing.id} />
          ))}
        {currentUser && currentUser.listings.length === 0 && (
          <Link href="/create-listing">
            <Button>Create Listing</Button>
          </Link>
        )}
      </Stack>
    </>
  );
};

UserPage.getInitialProps = ({ query }) => ({ userId: query.userId });

export default UserPage;
