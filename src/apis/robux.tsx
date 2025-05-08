import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useDebounce } from "@/utils/debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface RobuxCodeResponse {
    message: string;
    data: RobuxCodeItem[];
    totalPages: number;
  }
  
  export interface RobuxCodeItem {
    id: string;
    robuxcode: string;
    name: string;
    email: string;
    picture: string;
    code: string;
    amount: number;
    status: 'pending' | 'redeemed' | 'used' | string; // Extend as needed
    createdAt: string; // ISO date string (e.g., "2025-04-30")
    isUsed: boolean
  }
  

export const getRobuxList = async (page: number, limit: number, status: string, search: string): Promise<RobuxCodeResponse> => { 
    const response = await axiosInstance.get(
      "/robuxcode/getrobuxcodes",
      {params:{page, limit, status, search}}
    );
    return response.data
  };
  
  
export const useGetRobuxList = (page: number, limit: number, status: string, search: string) => {

  const debouncedQuery = useDebounce(search, 500);
    return useQuery({
      queryKey: ["robux",page, limit, status, debouncedQuery ],
      queryFn: () => getRobuxList(page, limit, status, debouncedQuery),
      enabled: debouncedQuery !== undefined,
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
};
  
export const createRobux = async (robuxcode: string, amount: number) => { 
    const response = await axiosInstance.post("/robuxcode/createrobuxcode", { robuxcode, amount });
    return response.data;
  };
  
  export const useCreateRobux = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ robuxcode, amount }: { robuxcode: string, amount: number }) =>
        createRobux(robuxcode, amount),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["robux"] });
          }
    
    });
  };


  export const editRobux = async (robuxcodeid: string,robuxcode: string, amount: number) => { 
    const response = await axiosInstanceFormData.post("/robuxcode/editrobuxcode", { robuxcode, amount, robuxcodeid });
    return response.data;
  };
  
  export const useEditRobux = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ robuxcode, amount, robuxcodeid}: {robuxcodeid: string, robuxcode: string, amount: number }) =>
        editRobux(robuxcodeid, robuxcode, amount),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["robux"] });
          }
    
    });
  };


  export const deleteRobux = async (robuxcodeid: string) => {
    const response = await axiosInstance.post("/robuxcode/deleterobuxcode", {robuxcodeid });
    return response.data;
  };
  
  export const useDeleteRobux = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ robuxcodeid}: {robuxcodeid: string }) =>
        deleteRobux(robuxcodeid),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["robux"] });
          }
    
    });
  };

















