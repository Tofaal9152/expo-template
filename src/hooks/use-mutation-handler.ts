import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "./use-toast";
import { env } from "@/lib/env";

type UseMutationHandlerOptions<TData, TVariables> = {
  mutationFn: (data: TVariables) => Promise<TData>;

  invalidateKeys?: QueryKey[]; //  multiple queries invalidate
  successMessage?: { title: string; description?: string };
  errorMessage?: { title: string; description?: string };

  showSuccessToast?: boolean;
  showErrorToast?: boolean;

  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;

  debug?: boolean;
  debugLabel: string;
};

export function useMutationHandler<TData, TVariables>({
  mutationFn,
  invalidateKeys,
  successMessage,
  errorMessage,
  showSuccessToast = true,
  showErrorToast = true,
  onSuccess,
  onError,
  debug = true,
  debugLabel = "Api",
}: UseMutationHandlerOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, AxiosError<any>, TVariables>({
    mutationFn,

    onSuccess: async (data) => {
      //  invalidate multiple queries
      // Debug logging for success
      if (debug && env.isDevelopment) {
        console.group(`✅ [${debugLabel ?? "Mutation"}] Success`);
        console.log("Response:", data);
        console.groupEnd();
      }
      if (invalidateKeys?.length) {
        await Promise.all(
          invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: key }),
          ),
        );
      }

      if (showSuccessToast && successMessage) {
        toast({ type: "success", ...successMessage });
      }

      onSuccess?.(data);
    },

    onError: (error) => {
      const msg =
        error.response?.data?.message ||
        errorMessage?.description ||
        "Something went wrong";

      if (debug && env.isDevelopment) {
        console.group(`❌ [${debugLabel ?? "Mutation"}] Error`);
        console.log("Status:", error.response?.status);
        console.log("Message:", msg);
        console.log("Full error:", error);
        console.groupEnd();
      }
      
      if (showErrorToast) {
        toast({
          type: "error",
          title: errorMessage?.title || "Action Failed",
          description: msg,
        });
      }

      onError?.(error);
    },
  });
}
