import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useDebounce } from "@/utils/debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface NewTabResponse {
    message: string; 
    data: Newtab[];
    totalpages: number;
  }
  
  export interface Newtab {
    id: string;
    title: string,
    description: string,
  }
  


export const getPromos = async (): Promise<NewTabResponse> => { 
    const response = await axiosInstance.get(
      "/section/getpromocodesections",
    );
    return response.data
  };
  
  
export const useGetPromos = () => {
    return useQuery({
      queryKey: ["promos"],
      queryFn: () => getPromos(),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
};

export const createPromo = async ( title: string, description: string) => { 
    const response = await axiosInstance.post("/section/createpromocodesection", { title, description });
    return response.data;
  };
  
  export const useCreatePromo = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ title, description }: { title: string, description: string}) =>
        createPromo( title, description),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promos"] });
          }
    
    });
  };



  export const editPromo = async ( id: string, title: string, description: string) => { 
    const response = await axiosInstance.post("/section/updatepromocodesection", { id, title, description });
    return response.data;
  };
  
  export const useEditPromos = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({id, title, description}: {id: string, title: string, description: string}) =>
        editPromo(id, title, description),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promos"] });
          }
    
    });
  };


  export const deleteNews = async (id: string) => {
    const response = await axiosInstance.post("/section/deletewhatsnewsection", {id });
    return response.data;
  };
  
  export const useDeleteNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({id}: {id: string }) =>
        deleteNews(id),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tabs"] });
          }
    
    });
  };

















