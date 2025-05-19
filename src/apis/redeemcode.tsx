import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useDebounce } from "@/utils/debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

  
export const checkCode = async (code: string) => { 
    const response = await axiosInstance.post("/code/checkcode",{code});
    return response.data;
  };
  
  export const useCheckCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ code}: {code: string}) =>
        checkCode(code),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
          }
    
    });
  };


















