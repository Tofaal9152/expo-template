import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { toast } from "@/hooks/use-toast";
import { request } from "@/lib/http/request";
import { useAuthStore } from "@/store/auth-store";
import { LoginData } from "../schemas/login.schema";

export function useLoginMutation() {
  return useMutationHandler({
    mutationFn: async (data: LoginData) => {
      const response: any = await request.post("/auth/signin", {
        ...data,
      });

      const result = response?.data ?? response;
      const { user } = result;

      if (user.role !== "STUDENT") {
        throw new Error("Invalid login attempt.");
      }

      return result;
    },

    showErrorToast: true,
    successMessage: {
      title: "Login Successful",
      description: "You have successfully logged in.",
    },
    onSuccess: (response: any) => {
      const { user, accessToken } = response;
      const { setRole, setIsLoggedIn, setToken, setUserId } =
        useAuthStore.getState();

      setRole(user.role.toLowerCase());
      setUserId(user.id);
      setToken(accessToken);
      setIsLoggedIn(true);
    },
    
    debugLabel: "login",
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description:
          error?.message || "Something went wrong. Please try again.",
        type: "error",
      });
    },
  });
}
