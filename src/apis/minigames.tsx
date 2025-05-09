import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useDebounce } from "@/utils/debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface ImageSectionResponse {
    message: string; 
    data: ImageSection[];
    totalpages: number;
  }
  
  export interface ImageSection {
    id: string;
    section: 'welcome' | 'minigame';
    image: string; 
  }
  
export const getMinigameList = async (filter: string,limit: number): Promise<ImageSectionResponse> => { 
    const response = await axiosInstance.get(
      "/section/getimagesections",
      {params: {filter, limit}}
    );
    return response.data
  };
  
  
export const useGetMinigameList = (filter: string, limit: number) => {
    return useQuery({
      queryKey: ["randomminigames", filter, limit],
      queryFn: () => getMinigameList(filter, limit),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
};

export const getMinigameListRandom = async (): Promise<ImageSectionResponse> => { 
    const response = await axiosInstance.get(
      "/section/getimagewelcomesections",
    );
    return response.data
  };
  
  
export const useGetMinigameListRandom = () => {
    return useQuery({
      queryKey: ["minigames"],
      queryFn: () => getMinigameListRandom(),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
};

export const getMinigameListRandomLp = async (): Promise<ImageSectionResponse> => { 
    const response = await axiosInstance.get(
      "/section/getimagewelcomesectionslp",
    );
    return response.data
  };
  
  
export const useGetMinigameListRandomLp = () => {
    return useQuery({
      queryKey: ["minigameslp"],
      queryFn: () => getMinigameListRandomLp(),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
};

export const getMinigameListLp = async (): Promise<ImageSectionResponse> => { 
    const response = await axiosInstance.get(
      "/section/getimagesectionsminigamelp",
    );
    return response.data
  };
  
  
export const useGetMinigameListLp = () => {
    return useQuery({
      queryKey: ["minigameslistlp"],
      queryFn: () => getMinigameListLp(),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
};

export const createMinigame = async (image: File | null, section: string) => { 
    const response = await axiosInstanceFormData.post("/section/createimagesection", { image, section });
    return response.data;
  };
  
  export const useCreateMinigame = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({  image, section }: { image: File | null, section: string }) =>
        createMinigame( image, section),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["randomminigames"] });
          }
    
    });
  };



  export const editMinigame = async (image: File | null, id: string) => { 
    const response = await axiosInstanceFormData.post("/section/updateimagesection", { image, id });
    return response.data;
  };
  
  export const useEditMinigame = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ image, id}: {image: File | null, id: string}) =>
        editMinigame(image, id),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["randomminigames"] });
          }
    
    });
  };


  export const deleteMinigame = async (id: string) => {
    const response = await axiosInstance.post("/section/deleteimagesection", {id });
    return response.data;
  };
  
  export const useDeleteMinigame = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({id}: {id: string }) =>
        deleteMinigame(id),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["randomminigames"] });
          }
    
    });
  };

















