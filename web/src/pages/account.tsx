import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import authService from "../../services/authService";
import userService from "../../services/userService";
import redirectIfNotAuth from "../../utils/redirectIfNotAuth";
import { toErrorMap } from "../../utils/toErrorMap";
import useFetch from "../../utils/useFetch";
import InputField from "../components/inputs/InputField";
import Navbar from "../components/shared/Navbar";

type Props = {};

const AccountPage = (props: Props) => {
  redirectIfNotAuth();

  const router = useRouter();

  const [isLoading, response, error] = useFetch(() =>
    userService.getCurrentUser()
  );
  const user = response?.data;

  const {
    isOpen: emailIsOpen,
    onOpen: emailOnOpen,
    onClose: emailOnClose,
  } = useDisclosure();
  const {
    isOpen: passwordIsOpen,
    onOpen: passwordOnOpen,
    onClose: passwordOnClose,
  } = useDisclosure();

  return (
    <>
      <Navbar />
      {!isLoading && (
        <Stack padding={5}>
          <Heading size="md">Login details</Heading>
          <Container>
            <SimpleGrid columns={3} spacing={50}>
              <Flex alignItems={"center"}>
                <Text>Email</Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Text>{user.email}</Text>
              </Flex>
              <Box>
                <Button onClick={emailOnOpen}>Change Email</Button>
              </Box>

              <Flex alignItems={"center"}>
                <Text>Password</Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Text>••••••••</Text>
              </Flex>
              <Box>
                <Button onClick={passwordOnOpen}>Change Password</Button>
              </Box>
            </SimpleGrid>
            <Modal isOpen={emailIsOpen} onClose={emailOnClose}>
              <ModalOverlay />
              <Formik
                initialValues={{ password: "", newEmail: "" }}
                onSubmit={async (values, { setErrors }) => {
                  try {
                    await authService.changeEmail(values);
                    router.reload();
                  } catch (error) {
                    const errors = error.response?.data?.errors;
                    if (errors) {
                      setErrors(toErrorMap(errors));
                    }
                  }
                }}
              >
                {() => (
                  <ModalContent>
                    <ModalHeader>Change Email</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Form>
                        <Stack spacing={4}>
                          <InputField
                            name="newEmail"
                            placeholder="New Email"
                            label="New Email"
                          />
                          <InputField
                            name="password"
                            placeholder="Password"
                            label="Password"
                            type="password"
                          />
                        </Stack>
                      </Form>
                    </ModalBody>

                    <ModalFooter>
                      <Button type="submit">Change Email</Button>
                    </ModalFooter>
                  </ModalContent>
                )}
              </Formik>
            </Modal>
            <Modal isOpen={passwordIsOpen} onClose={passwordOnClose}>
              <ModalOverlay />
              <Formik
                initialValues={{ oldPassword: "", newPassword: "" }}
                onSubmit={async (values, { setErrors }) => {
                  try {
                    await authService.changePassword(values);
                    router.reload();
                  } catch (error) {
                    const errors = error.response?.data?.errors;
                    if (errors) {
                      setErrors(toErrorMap(errors));
                    }
                  }
                }}
              >
                {() => (
                  <ModalContent>
                    <ModalHeader>Change Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Form>
                        <Stack spacing={4}>
                          <InputField
                            name="oldPassword"
                            placeholder="Old Password"
                            label="Old Password"
                            type="password"
                          />
                          <InputField
                            name="newPassword"
                            placeholder="New Password"
                            label="New Password"
                            type="password"
                            autoComplete="new-password"
                          />
                        </Stack>
                      </Form>
                    </ModalBody>

                    <ModalFooter>
                      <Button type="submit">Change Password</Button>
                    </ModalFooter>
                  </ModalContent>
                )}
              </Formik>
            </Modal>
          </Container>
          <Divider />
        </Stack>
      )}
    </>
  );
};

export default AccountPage;
