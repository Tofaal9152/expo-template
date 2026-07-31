import { useFetchData } from "@/hooks/use-fetch-data";

export const STUDENT_USER_PROFILE = "student-user-profile";

export const useGetUser = () => {
  return useFetchData<any>({
    url: "/patient/profile",
    querykey: [STUDENT_USER_PROFILE],
  });
};
