import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const changepaswwordUser = async (newpw: string) => { 
    const response = await axiosInstance.post("/auth/changepassword", { newpw});
    return response.data;
  };
  
  export const useChangepaswwordUser = () => {
    return useMutation({
      mutationFn: ({ newpw }: { newpw: string }) =>
        changepaswwordUser(newpw),
        onError: (error) => {
            handleApiError(error);
        },
    
    });
  };
















