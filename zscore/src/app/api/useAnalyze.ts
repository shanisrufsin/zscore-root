import fetcher from "@/utilities/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";

const useAnalyze = () => {
  return useMutation({
    mutationKey: ["analyze"],
    mutationFn: async (body: {
      district: number;
      zscore: number;
    }): Promise<number[]> => {
      const { data } = await fetcher().post("/new", body);
      return data;
    },
  });
};

export default useAnalyze;
