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
}

interface ItemResponse {
  message: string;
  data: Item[];
  totalPages: number;
}

  

export const getItemList = async (): Promise<ItemResponse> => { 
    const response = await axiosInstance.get(
      "/item/getitems",
    );
    return response.data
  };
  
  
export const useGetItemsList = () => {
    return useQuery({
      queryKey: ["items" ],
      queryFn: () => getItemList(),
     
    });
};
  
export const createItems = async (itemid: string, itemname: string) => { 
    const response = await axiosInstance.post("/item/createitem", { itemid, itemname });
    return response.data;
  };
  
  export const useCreateItems = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ itemid, itemname }: { itemid: string, itemname: string }) =>
        createItems(itemid, itemname),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
          }
    
    });
  };


  export const editItems = async (id: string,itemid: string, itemname: string ) => { 
    const response = await axiosInstance.post("/item/updateitem", { id, itemid, itemname });
    return response.data;
  };
  
  export const useEditItems = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, itemid, itemname}: {id: string,itemid: string, itemname: string }) =>
        editItems(id, itemid, itemname),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
          }
    
    });
  };


  export const deleteItem = async (id: string) => {
    const response = await axiosInstance.post("/item/deleteitem", {id });
    return response.data;
  };
  
  export const useDeleteItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id}: {id: string }) =>
        deleteItem(id),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
          }
    
    });
  };

















