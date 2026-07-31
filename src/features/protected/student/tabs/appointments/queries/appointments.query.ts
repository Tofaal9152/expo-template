import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const STUDENT_APPOINTMENTS = "student-appointments";

export const useGetAppointments = ({
  query,
}: {
  query: {
    page: number;
  };
}) => {
  const endPoint = makeEndpoint(`/appointments/patient/paid`, {
    p: query.page,
    limit: 10,
  });
  return useFetchData<any>({
    url: endPoint,
    querykey: [STUDENT_APPOINTMENTS, query],
  });
};
