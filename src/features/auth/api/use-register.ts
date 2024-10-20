import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;
type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register["$post"]({ json });
      if (!response.ok) throw new Error("Something went wrong");
      return await response.json();
    },
    onSuccess() {
      toast.success("Account Created Successfully");

      queryClient.invalidateQueries({
        queryKey: ["current"],
      });
      router.refresh();
    },
    onError() {
      toast.error("Failed to Create Account");
    },
  });

  return mutation;
};
