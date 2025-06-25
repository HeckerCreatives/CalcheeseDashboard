import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface CodeStatsResponse {
  message: string;
  data: {
    totalcodes: number;
    totalusedcodes: number;
    totalunusedcodes: number;
    totalexpiredcodes: number;
  };
}

export interface GeoCount {
  region: string;
  count: number;
}

export interface GeoCountResponse {
  message: string;
  data: GeoCount[];
}


export interface CodeDistributionItem {
  type: string
  total: number
  claimed: number
  unclaimed: number
}

export interface GetCodeDistributionResponse {
  success: boolean
  data: CodeDistributionItem[]
}




export const getDashboardCount = async (): Promise<CodeStatsResponse | null> => { 
  const response = await axiosInstance.get(
    "/dashboard/getcardanalytics",
  );
  return response.data
  
};


export const useGetDashboardCount = () => {
  return useQuery({
    queryKey: ["analyticscount", ],
    queryFn: () => getDashboardCount(),
    
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
    
  });
  };


  export const getRedeemedCodesChartData = async ( charttype: string): Promise<CodeStatsResponse | null> => { 
    const response = await axiosInstance.get(
      "/dashboard/getredeemcodeanalytics",
      {params: {charttype}}
    );
    return response.data
  };
  
  
export const useGetRedeemedCodesChartData = (charttype: string) => {
    return useQuery({
      queryKey: ["chests", charttype ],
      queryFn: () => getRedeemedCodesChartData(charttype),
      // staleTime: 5 * 60 * 1000,
      // refetchOnMount: false, 
      // refetchOnWindowFocus: false,
      
    });
};

export const getRegionAnalytics = async ():Promise <GeoCountResponse> => { 
    const response = await axiosInstance.get(
      "/dashboard/getregionalanlytics",
    );
    return response.data
  };
  
  
export const  useGetRegionAnalytics = () => {
     return useQuery({
      queryKey: ["region" ],
      queryFn: () => getRegionAnalytics(),
      // staleTime: 5 * 60 * 1000,
      // refetchOnMount: false, 
      // refetchOnWindowFocus: false,
      
});
}


export const getCodeDistribution = async (): Promise<GetCodeDistributionResponse | null> => { 
  const response = await axiosInstance.get(
    "/dashboard/getcodedistribution",
  );
  return response.data
  
};


export const useGetCodeDistribution = () => {
  return useQuery({
    queryKey: ["codedistribution", ],
    queryFn: () => getCodeDistribution(),
    
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
    
  });
  };

export const getCodeRedemption = async (): Promise<GetCodeDistributionResponse | null> => { 
  const response = await axiosInstance.get(
    "/dashboard/getcoderedemption",
  );
  return response.data
  
};


export const useGetCodeRedemption = () => {
  return useQuery({
    queryKey: ["coderedemption", ],
    queryFn: () => getCodeRedemption(),
    
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
    
  });
  };















