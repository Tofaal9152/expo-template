import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { request } from "@/lib/http/request";
import { useRouter } from "expo-router";
import { PaymentData } from "../schemas/payments.schema";

export function usePaymentMutation() {
  const router = useRouter();
  return useMutationHandler({
    mutationFn: (data: PaymentData) => {
      return request.post("/appointments/payment", {
        doctorId: data.doctorId,
      });
    },
    showErrorToast: true,
    showSuccessToast: false,
    debugLabel: "payment",
    async onSuccess(data: any) {
      const paymentUrl = data?.payment_url;

      if (!paymentUrl) return;

      router.push(
        `/appointment/payment?paymentUrl=${encodeURIComponent(paymentUrl)}`,
      );
    },
  });
}
