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
  quantity: number
  createdAt: string;
}

interface ItemResponse {
  message: string;
  data: Item[];
  totalPages: number;
}

  

export const getItemList = async (page: number, limit: number): Promise<ItemResponse> => { 
    const response = await axiosInstance.get(
      "/item/getitems",
      {params:{page, limit}}
    );
    return response.data
  };
  
  
export const useGetItemsList = (page: number, limit: number) => {
    return useQuery({
      queryKey: ["items",page, limit ],
      queryFn: () => getItemList(page, limit),
     
    });
};
  
export const createItems = async (itemid: string, itemname: string, quantity: number) => { 
    const response = await axiosInstance.post("/item/createitem", { itemid, itemname , quantity});
    return response.data;
  };
  
  export const useCreateItems = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ itemid, itemname, quantity }: { itemid: string, itemname: string, quantity: number }) =>
        createItems(itemid, itemname, quantity),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
          }
    
    });
  };


  export const editItems = async (id: string,itemid: string, itemname: string,quantity: number ) => { 
    const response = await axiosInstance.post("/item/edititem", { id, itemid, itemname, quantity });
    return response.data;
  };
  
  export const useEditItems = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, itemid, itemname, quantity}: {id: string,itemid: string, itemname: string, quantity: number }) =>
        editItems(id, itemid, itemname, quantity),
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

















