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
  category: string
  rarity: string
}

interface ItemResponse {
  message: string;
  data: Item[];
  totalPages: number;
}

  

export const getItemList = async (page: number, limit: number, category?: string, rarity?:string): Promise<ItemResponse> => { 
    const response = await axiosInstance.get(
      "/item/getitems",
      {params:{page, limit, category, rarity}}
    );
    return response.data
  };
  
  
export const useGetItemsList = (page: number, limit: number, category?: string, rarity?:string) => {
    return useQuery({
      queryKey: ["items",page, limit, category, rarity ],
      queryFn: () => getItemList(page, limit, category, rarity),
     
    });
};
  
export const createItems = async (itemid: string, itemname: string, quantity: number, category: string, rarity: string, code?:string) => { 
    const response = await axiosInstance.post("/item/createitem", { itemid, itemname , quantity, category, rarity, code});
    return response.data;
  };
  
  export const useCreateItems = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ itemid, itemname, quantity, category, rarity, code }: { itemid: string, itemname: string, quantity: number, category: string, rarity: string, code?:string }) =>
        createItems(itemid, itemname, quantity, category, rarity, code),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
          }
    
    });
  };


  export const editItems = async (id: string,itemid: string, itemname: string,quantity: number , category: string, rarity: string, ) => { 
    const response = await axiosInstance.post("/item/edititem", { id, itemid, itemname, quantity, category, rarity });
    return response.data;
  };
  
  export const useEditItems = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, itemid, itemname, quantity, category, rarity}: {id: string,itemid: string, itemname: string, quantity: number, category: string, rarity: string }) =>
        editItems(id, itemid, itemname, quantity, category, rarity),
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


  export const deleteMultipleItem = async (ids: string[]) => {
    const response = await axiosInstance.post("/item/deletemultipleitems", {ids });
    return response.data;
  };
  
  export const useDeleteMultipleItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ ids}: {ids: string[] }) =>
        deleteMultipleItem(ids),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
          }
    
    });
  };

















