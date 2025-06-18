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
}

interface ItemResponse {
  message: string;
  data: Item[];
  totalPages: number;
}

  

export const getItemList = async (page: number, limit: number, category?: string): Promise<ItemResponse> => { 
    const response = await axiosInstance.get(
      "/item/getitems",
      {params:{page, limit, category}}
    );
    return response.data
  };
  
  
export const useGetItemsList = (page: number, limit: number, category?: string) => {
    return useQuery({
      queryKey: ["items",page, limit, category ],
      queryFn: () => getItemList(page, limit, category),
     
    });
};
  
export const createItems = async (itemid: string, itemname: string, quantity: number, category: string) => { 
    const response = await axiosInstance.post("/item/createitem", { itemid, itemname , quantity, category});
    return response.data;
  };
  
  export const useCreateItems = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ itemid, itemname, quantity, category }: { itemid: string, itemname: string, quantity: number, category: string }) =>
        createItems(itemid, itemname, quantity, category),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
          }
    
    });
  };


  export const editItems = async (id: string,itemid: string, itemname: string,quantity: number , category: string) => { 
    const response = await axiosInstance.post("/item/edititem", { id, itemid, itemname, quantity, category });
    return response.data;
  };
  
  export const useEditItems = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, itemid, itemname, quantity, category}: {id: string,itemid: string, itemname: string, quantity: number, category: string }) =>
        editItems(id, itemid, itemname, quantity, category),
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

















