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
  















