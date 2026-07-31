import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { request } from "@/lib/http/request";
import { useRouter } from "expo-router";
import { StudentSignupData } from "../schemas/signup.schema";

export function useStudentSignupMutation() {
  const router = useRouter();
  return useMutationHandler({
    mutationFn: (data: StudentSignupData) => {
      return request.post("/auth/patient/signup", {
        ...data,
      });
    },
    debugLabel: "student-signup",
    successMessage: {
      title: "Signup Successful",
      description: "You have been signed up successfully!",
    },
    showErrorToast: true,
    onSuccess() {
      router.replace("/(auth)/login");
    },
  });
}
