import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error.data.message || "Something went wrong");
      }
    });
  }, [errors]);
};

export const useAsyncMutation = (mutationHooks) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationHooks();

  const executeMutate = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating data...");
    try {
      const res = await mutate(...args);
      console.log(res)
      if (res?.data) {
        toast.success(res.data?.message || "Friend request send", {
          id: toastId,
        });
        setData(res.data);
      }
      setIsLoading(false)
    } catch (error) {
      toast.error(error?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return [executeMutate, isLoading, data];
};

export const useSocketEvents = (socket, handlers) => {

  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
      socket.off(event, handler);
    });
    };
  }, [socket , handlers]);
};
