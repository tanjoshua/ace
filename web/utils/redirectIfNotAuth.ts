import { useRouter } from "next/router";
import { useEffect } from "react";
import userService from "../services/userService";
import useFetch from "./useFetch";

const redirectIfNotAuth = () => {
  const router = useRouter();
  const [isLoading, response, error] = useFetch(() =>
    userService.getCurrentUser()
  );

  useEffect(() => {
    if (!isLoading && !response.data) {
      console.log(response.data);
      router.replace("/login?next=" + router.pathname);
    }
  }, [isLoading, response, router]);
};

export default redirectIfNotAuth;
