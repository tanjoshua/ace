import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import useFetch from "../../../utils/useFetch";
import userService from "../../../services/userService";
import authService from "../../../services/authService";
import { useRouter } from "next/router";

const Links = [{ name: "Search", ref: "/search" }];

const NavLink = ({ link }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={link.ref}
  >
    {link.name}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [isLoading, response, error] = useFetch(() =>
    userService.getCurrentUser()
  );
  const isLoggedIn = !!response?.data;
  const user = response?.data;

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justifyContent={"space-between"}
      >
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <NextLink href="/" passHref>
            <Link>Ace</Link>
          </NextLink>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink link={link} key={link.name}></NavLink>
            ))}
          </HStack>
        </HStack>
        {!isLoading && !isLoggedIn && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <NextLink href={`/login`} passHref>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
              >
                Login
              </Button>
            </NextLink>
            <NextLink href={`/register`} passHref>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Register
              </Button>
            </NextLink>
          </Stack>
        )}
        {!isLoading && isLoggedIn && (
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem as="a" href={`/account`}>
                  Account Settings
                </MenuItem>
                <MenuItem as="a" href="/dashboard">
                  Dashboard
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={async () => {
                    await authService.logout();
                    router.reload();
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink link={link} key={link.name}></NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
