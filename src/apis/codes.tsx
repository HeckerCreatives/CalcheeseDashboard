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
  status: string
  chest: Chest;
  items: Item[];
  expiration: string; // You can use `Date` if you plan to convert it
  type: string; // Consider using a union type if values are known: "ingame" | "ticket" | etc.
  isUsed: boolean;
  robuxcode: {
      id: string,
      robuxcode: string
  },
  form: {
      name: string
      email: string
  }
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


  


export const exportCodeslist = async (type: string) => {
  const response = await axiosInstance.get("/code/export-csv", {
    params: { type },
    responseType: "blob", // <- VERY IMPORTANT
  });

  const disposition = response.headers["content-disposition"];
  let filename = "calcheeseworlcodes.csv";

  if (disposition && disposition.includes("filename=")) {
    const match = disposition.match(/filename="?([^"]+)"?/);
    if (match?.[1]) {
      filename = match[1];
    }
  }

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

  
export const useExportCodeslist = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({type} : {type: string}) =>
        exportCodeslist( type),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [""] });
          }
    
    });
};

export const approveClaim = async (id: string, status: string) => { 
    const response = await axiosInstance.post("/code/approverejectcode", { id,status});
    return response.data;
  };
  
  export const useApproveClaim = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id,status }: {id: string, status: string}) =>
        approveClaim( id,status),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["codeslist"] });
          }
    
    });
  };
  
















