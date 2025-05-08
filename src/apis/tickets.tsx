import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useDebounce } from "@/utils/debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface TicketType {
    _id: string;
    category: string;
    tickettype: string;
    ticketname: string;
    createdAt: string; // or Date if you plan to parse it
    updatedAt: string; // or Date
    __v: number;
  }
  
  export interface TicketTypeResponse {
    message: string;
    data: TicketType[];
  }
  

export interface TicketCodeResponse {
    message: string;
    data: TicketCodeItem[];
    totalPages: number;
  }
  
  export interface TicketCodeItem {
    ticketcode: string
    tickettype: string
    ticketname: string
    id: string;
    name: string;
    email: string;
    picture: string;
    status: 'pending' | 'redeemed' | 'used' | string;
    createdAt: string;
    tickettypeid: string
    isUsed: boolean
  }

  export const getTicketTypeList = async (): Promise<TicketTypeResponse> => { 
    const response = await axiosInstance.get(
      "/ticket/gettickettypes?category",
    );
    return response.data
  };
  
  
export const useGetTicketTypeList = () => {
    return useQuery({
      queryKey: ["robux"],
      queryFn: () => getTicketTypeList(),
      // staleTime: 5 * 60 * 1000,
      // refetchOnMount: false, 
      // refetchOnWindowFocus: false,
    });
};
  

export const getTicketList = async (page: number, limit: number, status: string, search: string): Promise<TicketCodeResponse> => { 
    const response = await axiosInstance.get(
      "/ticket/gettickets",
      {params:{page, limit, status, search}}
    );
    return response.data
  };
  
  
export const useGetTicketList = (page: number, limit: number,  status: string, search: string) => {
      const debouncedQuery = useDebounce(search, 500);
    
    return useQuery({
      queryKey: ["tickets",page, limit, status, debouncedQuery ],
      queryFn: () => getTicketList(page, limit, status, debouncedQuery),
      enabled: debouncedQuery !== undefined,
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
};
  
export const createTicket = async (ticketcode: string, tickettype: string) => { 
    const response = await axiosInstance.post("/ticket/createticket", { ticketcode, tickettype });
    return response.data;
  };
  
  export const useCreateTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ ticketcode, tickettype }: {ticketcode: string, tickettype: string}) =>
        createTicket(ticketcode, tickettype),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
          }
    
    });
  };


  export const editTicket = async (ticketcode: string,ticketid: string, tickettype: string) => { 
    const response = await axiosInstanceFormData.post("/ticket/editticket", { ticketcode, ticketid, tickettype });
    return response.data;
  };
  
  export const useEditTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ ticketcode, ticketid, tickettype}: {ticketcode: string,ticketid: string, tickettype: string}) =>
        editTicket(ticketcode, ticketid, tickettype),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
          }
    
    });
  };


  export const deleteTicket = async (ticketid: string) => {
    const response = await axiosInstance.post("/ticket/deleteticket", {ticketid });
    return response.data;
  };
  
  export const useDeleteTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ ticketid}: {ticketid: string }) =>
        deleteTicket(ticketid),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
          }
    
    });
  };

















