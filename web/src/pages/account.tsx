import React from "react";
import redirectIfNotAuth from "../../utils/redirectIfNotAuth";
import Navbar from "../components/shared/Navbar";

type Props = {};

const AccountPage = (props: Props) => {
  redirectIfNotAuth();

  return (
    <>
      <Navbar />
    </>
  );
};
