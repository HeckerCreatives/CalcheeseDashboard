import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Chests {
    id: string;
    name: string;
    type: string;
    createdAt: string; // or use Date if you're parsing it
    totalCodes: number
    totalused: number,
    totalunused: number,
  }
  
  interface ChestsResponse {
    message: string;
    data: Chests[];
  }
  


export const getChests = async (): Promise<ChestsResponse | null> => { 
  const response = await axiosInstance.get(
    "/code/getchests",
  );
  return response.data
};


export const useGetChests = () => {
  return useQuery({
    queryKey: ["chests", ],
    queryFn: () => getChests(),
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
  });
  };















