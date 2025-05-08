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
    section: 'welcome' | 'minigame';
    image: string; 
    tab: string,
    description: string,
  }
  


export const getNewtab = async (): Promise<NewTabResponse> => { 
    const response = await axiosInstance.get(
      "/section/getwhatsnewsections",
    );
    return response.data
  };
  
  
export const usegetNewtab = () => {
    return useQuery({
      queryKey: ["tabs"],
      queryFn: () => getNewtab(),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
};

export const createNewTab = async (image: File | null, tab: string, description: string) => { 
    const response = await axiosInstanceFormData.post("/section/createwhatsnewsection", { image, tab, description });
    return response.data;
  };
  
  export const useCreateNewTab = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({  image, tab, description }: { image: File | null, tab: string, description: string}) =>
        createNewTab( image, tab, description),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tabs"] });
          }
    
    });
  };



  export const editNews = async (image: File | null, id: string, tab: string, description: string) => { 
    const response = await axiosInstanceFormData.post("/section/updatewhatsnewsection", { image, id, tab, description });
    return response.data;
  };
  
  export const useEditNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({image, id, tab, description}: {image: File | null, id: string, tab: string, description: string}) =>
        editNews(image, id, tab, description),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tabs"] });
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

















