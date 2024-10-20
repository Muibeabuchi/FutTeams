import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<typeof client.api.workspace.$post>;
type ResponseType = InferResponseType<typeof client.api.workspace.$post>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.workspace.$post({ json });
      return await response.json();
    },
    onSuccess() {
      queryClient.invalidateQueries({
        // this should probably also reference the userId Key
        queryKey: ["workspaces"],
      });
    },
  });
  return mutation;
};
