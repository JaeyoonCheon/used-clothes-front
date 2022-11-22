import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../lib/api/user";

export default function useLogin(payload) {
  console.log(payload);
  const mutation = useMutation("login", loginAPI(payload), {
    onSuccess: (data) => {
      console.log("login success", data);
    },
    onError: (error) => {
      console.log("login failed", error);
    },
  });
  return mutation;
}
