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
  rarity: string
  quantity: string
}

export interface Code {
  id: string;
  code: string;
  status: string
  chest: Chest;
  claimdate: string
  items: Item[];
  expiration: string; 
  type: string;
  isUsed: boolean;
  archived: boolean
  robuxcode: {
      id: string,
      robuxcode: string
  },
  form: {
      name: string
      email: string
      picture: string
      guardian: string
      contact: string
      address: string
              
  }
}

  interface CodeResponse {
    message: string;
    data: Code[];
    totalPages: number
    totalDocs: number
    usedCodesCount: number 
    unusedCodesCount: number
    expiredCodesCount: number
  }


  


export const getChests = async (): Promise<ChestsResponse | null> => { 
  const response = await axiosInstance.get(
    "/chest/getchestcodeanalytics",
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


export const getCodesList = async (page: number, limit: number, type: string, rarity: string, item: string, status: string, search: string, archive?: boolean):Promise<CodeResponse> => { 
    const response = await axiosInstance.get(
      "/code/getcodes",
      {params:{page, limit, type, rarity,item, status, search, archive}}
    );
    return response.data
  };
  
  
export const useGetCodesList = (page: number, limit: number, type: string, rarity: string, item: string, status: string, search: string, archive?: boolean) => {

  const debouncedQuery = useDebounce(search, 500);
    return useQuery({
      queryKey: ["codeslist",page, limit, type, rarity,item, status, debouncedQuery, archive ],
      queryFn: () => getCodesList(page, limit, type, rarity,item, status, debouncedQuery, archive),
      enabled: debouncedQuery !== undefined,
      staleTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });
};


export const generateCodeslist = async (chest: string, expiration: string,codeamount: number, type: string, items: string[],socketid: string, length: any, rarity: string) => { 
    const response = await axiosInstance.post("/code/generatecode", { chest, expiration, codeamount, type, items, socketid, length, rarity});
    return response.data;
};
  
export const useGenerateCodeslist = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ chest, expiration, codeamount, type, items, socketid, length, rarity }: {chest: string, expiration: string,codeamount: number, type: string, items: string[], socketid: string, length: any, rarity: string}) =>
        generateCodeslist( chest, expiration, codeamount, type, items, socketid, length, rarity),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["codeslist"] });
             queryClient.invalidateQueries({ queryKey: ["analyticscount"] });
          }
    
    });
};


  


export const exportCodeslist = async (type: string, start: number, end: number, socketid: any) => {
  const response = await axiosInstance.get("/code/export-csv", {
    params: { type, start, end, socketid },
    // responseType: "blob",
  });

  // const disposition = response.headers["content-disposition"];
  // let filename = "calcheeseworlcodes.zip";

  // if (disposition && disposition.includes("filename=")) {
  //   const match = disposition.match(/filename="?([^"]+)"?/);
  //   if (match?.[1]) {
  //     filename = match[1];
  //   }
  // }

  // const url = window.URL.createObjectURL(new Blob([response.data]));
  // const link = document.createElement("a");
  // link.href = url;
  // link.setAttribute("download", filename);
  // document.body.appendChild(link);
  // link.click();
  // link.remove();
  // window.URL.revokeObjectURL(url);
};

  
export const useExportCodeslist = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({type, start, end, socketid} : {type: string, start: number, end: number, socketid: any}) =>
        exportCodeslist( type, start, end, socketid),
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

export const deleteCodes = async (ids: string[]) => { 
    const response = await axiosInstance.post("/code/deletecode", { ids});
    return response.data;
  };
  
export const useDeleteCodes = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ ids } : {ids: string[]}) =>
        deleteCodes( ids),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["codeslist"] });
            queryClient.invalidateQueries({ queryKey: ["analyticscount"] });
          }
    
    });
  };


  export const updateCodes = async (ids: string[], type:string, chest:string, items: string[], expiration: string, status: string, archive?: boolean, rarity?: string) => { 
    const response = await axiosInstance.post("/code/editmultiplecodes", { ids, type,chest, items, expiration, status, archive, rarity});
    return response.data;
  };
  
export const useUpdateCodes = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ ids, type, chest, items, expiration, status, archive, rarity } : {ids: string[], type:string, chest:string, items: string[], expiration: string, status: string, archive?: boolean, rarity?: string}) =>
        updateCodes( ids, type, chest, items, expiration, status, archive, rarity),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["codeslist"] });
            queryClient.invalidateQueries({ queryKey: ["analyticscount"] });
          }
    
    });
  };
  
  
















