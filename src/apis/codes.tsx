import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useDebounce } from "@/utils/debounce";
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


  interface Chest {
  id: string;
  chestid: string;
  chestname: string;
}

interface Item {
  id: string;
  itemid: string;
  itemname: string;
}

export interface Code {
  id: string;
  code: string;
  chest: Chest;
  items: Item[];
  expiration: string; // You can use `Date` if you plan to convert it
  type: string; // Consider using a union type if values are known: "ingame" | "ticket" | etc.
  isUsed: boolean;
}

  interface CodeResponse {
    message: string;
    data: Code[];
    totalPages: number
    totalDocs: number
    usedCodesCount: number 
    unusedCodesCount: number
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


export const getCodesList = async (page: number, limit: number, status: string, type: string, item: string, chest: string, search: string):Promise<CodeResponse> => { 
    const response = await axiosInstance.get(
      "/code/getcodes",
      {params:{page, limit, status, type, item, chest, search}}
    );
    return response.data
  };
  
  
export const useGetCodesList = (page: number, limit: number, status: string, type: string, item: string, chest: string, search: string) => {

  const debouncedQuery = useDebounce(search, 500);
    return useQuery({
      queryKey: ["codeslist",page, limit, status, type, item, chest, debouncedQuery ],
      queryFn: () => getCodesList(page, limit, status, type, item, chest, debouncedQuery),
      enabled: debouncedQuery !== undefined,
      // staleTime: 5 * 60 * 1000,
      // refetchOnMount: false, 
      // refetchOnWindowFocus: false,
    });
};


export const generateCodeslist = async (chest: string, expiration: string,codeamount: number, type: string, items: string[],socketid: string) => { 
    const response = await axiosInstance.post("/code/generatecode", { chest, expiration, codeamount, type, items, socketid});
    return response.data;
  };
  
  export const useGenerateCodeslist = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ chest, expiration, codeamount, type, items, socketid }: {chest: string, expiration: string,codeamount: number, type: string, items: string[], socketid: string}) =>
        generateCodeslist( chest, expiration, codeamount, type, items, socketid),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["codeslist"] });
          }
    
    });
  };
  
















