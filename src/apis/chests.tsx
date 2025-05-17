import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useDebounce } from "@/utils/debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface Item {
  id: string;
  itemid: string;
  itemname: string;
  createdAt: string;

  chestid: string
  chestname: string
  items: [
      {
          id: string
          itemname: string
          itemid: string
      }
  ],
}

interface ItemResponse {
  message: string;
  data: Item[];
  totalPages: number;
}

  

export const getChestList = async (): Promise<ItemResponse> => { 
    const response = await axiosInstance.get(
      "/chest/getchests",
    );
    return response.data
  };
  
  
export const useGetChestList = () => {
    return useQuery({
      queryKey: ["chest" ],
      queryFn: () => getChestList(),
     
    });
};
  
export const createChest = async (chestid: string, chestname: string, itemid: string[]) => { 
    const response = await axiosInstance.post("/chest/createchest", { chestid, chestname, itemid });
    return response.data;
  };
  
  export const useCreateChest = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ chestid, chestname, itemid }: { chestid: string, chestname: string, itemid: string[] }) =>
        createChest( chestid, chestname, itemid),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chest"] });
          }
    
    });
  };


  export const editChest = async (id: string,chestid: string, chestname: string, itemid: string[] ) => { 
    const response = await axiosInstance.post("/chest/editchest", { id, chestid, chestname, itemid});
    return response.data;
  };
  
  export const useEditChest = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, chestid, chestname, itemid}: {id: string,chestid: string, chestname: string, itemid: string[]}) =>
        editChest(id, chestid, chestname, itemid),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chest"] });
          }
    
    });
  };


  export const deleteChest = async (id: string) => {
    const response = await axiosInstance.post("/chest/deletechest", {id });
    return response.data;
  };
  
  export const useDeleteChest = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id}: {id: string }) =>
        deleteChest(id),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chest"] });
          }
    
    });
  };

















