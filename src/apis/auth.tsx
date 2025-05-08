import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const loginUser = async (username: string, password: string) => { 
    const response = await axiosInstance.post("/auth/login", { username, password });
    return response.data;
  };
  
  export const useLoginUser = () => {
    return useMutation({
      mutationFn: ({ username, password }: { username: string, password: string }) =>
        loginUser(username, password),
        onError: (error) => {
            handleApiError(error);
        },
    
    });
  };
















