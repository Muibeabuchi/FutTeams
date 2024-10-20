import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json });
      if (!response.ok) throw new Error("Something went wrong");

      return await response.json();
    },
    onSuccess() {
      toast.success("Logged In Successfully");

      // refresh the page or push to the home page
      router.refresh();
      // bust the current-query cache
      queryClient.invalidateQueries({
        queryKey: ["current"],
      });
    },
    onError() {
      toast.error("Failed To Create Workspace ");
    },
  });

  return mutation;
};
