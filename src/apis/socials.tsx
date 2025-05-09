import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useDebounce } from "@/utils/debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface SocialsResponse {
    message: string; 
    data: Socials[];
    totalpages: number;
}
  
export interface Socials {
    _id: string
    link: string
    title: string
    createdAt: string
}
  


export const getSocials = async (): Promise<SocialsResponse> => { 
    const response = await axiosInstance.get(
      "/sociallinks/getsociallinks",
    );
    return response.data
  };
  
  
export const useGetSocials = () => {
    return useQuery({
      queryKey: ["socialsurl"],
      queryFn: () => getSocials(),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
};



export const editSocials = async (title: string, link: string) => { 
    const response = await axiosInstance.post("/sociallinks/updatesociallink", { title, link });
    return response.data;
};
  
  export const useEditSocails = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ title, link }: {title: string, link: string}) =>
        editSocials( title, link ),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["socialsurl"] });
          }
    
    });
  };

















