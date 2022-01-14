import { useRouter } from "next/router";
import { useEffect } from "react";
import userService from "../services/userService";
import useFetch from "./useFetch";

const redirectIfNotUser = (userId, redirectPath) => {
  const router = useRouter();
  const [isLoading, response, error] = useFetch(() =>
    userService.getCurrentUser()
  );

  useEffect(() => {
    if (!isLoading && !response.data) {
      router.replace("/login?next=" + router.asPath);
    }

    if (!isLoading && response.data.id !== userId) {
      router.replace(redirectPath);
    }
  }, [isLoading, response, router]);
};

export default redirectIfNotUser;
