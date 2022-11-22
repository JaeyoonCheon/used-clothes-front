import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../lib/api/user";

export default function useRegister() {
  const mutation = useMutation(registerAPI, {
    onSuccess: (data) => {
      console.log("register success", data);
    },
    onError: (error) => {
      console.log("register failed", error);
    },
  });
  return mutation;
}
