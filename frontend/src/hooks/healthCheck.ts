import { healthCheck } from "@/api/healthCheck";
import { useMutation } from "@tanstack/react-query";

export const useHealthCheck = () => {
   return useMutation({
    mutationFn: healthCheck,
    onSuccess: () => {
      console.log("Health check successful");
    },
    onError: (error) => {
      console.error("Health check failed:", error);
    },
   })
};
