import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";

const useFetch = (service: () => Promise<AxiosResponse<any>>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await service();
        setResponse(res);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };

    fetch();
  }, []);

  return [isLoading, response, error];
};

export default useFetch;
