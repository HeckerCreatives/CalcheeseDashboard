import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useDebounce } from "@/utils/debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ActionData {
  type: 'generate' | 'export' | 'delete' | 'edit';
  value: string;
}

interface ApiResponse {
  message: string;
  data: ActionData[];
}


  

export const getMaintenance = async (): Promise<ApiResponse> => { 
    const response = await axiosInstance.get(
      "/maintenance/getmaintenance",
    );
    return response.data
  };
  
  
export const useGetMaintenance = () => {
    return useQuery({
      queryKey: ["maintenance"],
      queryFn: () => getMaintenance(),
     
    });
};



  export const updateMaintenance = async (type: string, value: number ) => { 
    const response = await axiosInstance.post("/maintenance/changemaintenance", {type, value });
    return response.data;
  };
  
  export const useUpdateMaintenance = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ type, value}: {type: string, value: number }) =>
        updateMaintenance(type, value),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["maintenance"] });
          }
    
    });
  };




















