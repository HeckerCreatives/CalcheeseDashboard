import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useDebounce } from "@/utils/debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface RewardData {
  message: string;
  data: {
    _id: string;
    chest: Chests
    expiration: string; // ISO date string
    items: Items[]; // Array of item IDs
    type: 'ingame' | string; // restrict to known types if possible
    status: 'to-claim' | 'claimed' | string; // extend as needed
    isUsed: boolean;
    code: string;
    __v: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
}

interface Chests {
  _id: string
  chestname: string
  chestid: string
  itemid: Items[]
            
}

interface Items {
  _id: string
  itemid: string
  itemname: string
  createdAt: string
}



  
export const checkCode = async (code: string): Promise<RewardData> => { 
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
            queryClient.invalidateQueries({ queryKey: [""] });
          }
    
    });
  };


  export const redeemCode = async (code: string, email: string, robloxid: string, picture: File | null, guardian: string, contact: number, address: string, type: string) => { 
    const response = await axiosInstanceFormData.post("/code/redeemcode",{code, email, picture, guardian, contact,address, robloxid, type});
    return response.data;
  };
  
  export const useRedeemCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ code, email, robloxid, picture, guardian, contact,address, type}: {code: string, email: string, robloxid: string, picture: File | null, guardian: string, contact: number, address: string, type: string}) =>
        redeemCode(code, email, robloxid, picture, guardian, contact,address, type),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: [""] });
             queryClient.invalidateQueries({ queryKey: ["analyticscount"] });

          }
    
    });
  };


    export const resetCode = async (id: string) => { 
    const response = await axiosInstance.post("/code/resetcode",{id});
    return response.data;
  };
  
  export const useResetCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({id}:{ id: string}) =>
        resetCode(id),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: [""] });
             queryClient.invalidateQueries({ queryKey: ["analyticscount"] });
             queryClient.invalidateQueries({ queryKey: ["codeslist"] });

          }
    
    });
  };




















