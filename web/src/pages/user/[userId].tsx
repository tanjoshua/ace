import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import userService from "../../../services/userService";
import useFetch from "../../../utils/useFetch";
import ListingBox from "../../components/ListingBox";
import Navbar from "../../components/shared/Navbar";

interface Props {
  userId: string;
}

const UserPage = ({ userId }: Props) => {
  const [isLoading, response, error] = useFetch(() =>
    userService.getUserById(userId)
  );
  const [currentUserIsLoading, currentUserResponse, currentUserError] =
    useFetch(() => userService.getCurrentUser());

  const user = response?.data;
  const currentUser = currentUserResponse?.data;
  console.log(user);

  return (
    <>
      <Navbar />
      {user && (
        <Stack padding={5}>
          <Flex alignItems="center" justify={"space-between"}>
            <Avatar size="2xl" />
            {!currentUserIsLoading && currentUser.id === user?.id && (
              <Button>Edit Profile</Button>
            )}
          </Flex>

          <Heading>{user.name}</Heading>
          <Text>{user.about}</Text>
          <Heading size="lg">Listings</Heading>
          <Divider />
          {user.listings.map((listing) => (
            <ListingBox listing={listing} key={listing.id} />
          ))}
        </Stack>
      )}
    </>
  );
};

UserPage.getInitialProps = ({ query }) => ({ userId: query.userId });

export default UserPage;
