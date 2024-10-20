import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  InferResponseType,
  //  InferRequestType,
} from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();
      if (!response.ok) throw new Error("Something went wrong");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Successfully Logged out");

      queryClient.invalidateQueries({ queryKey: ["current"] });
      router.refresh();
    },
    onError() {
      toast.error("Failed to log out");
    },
  });

  return mutation;
};
