import { useQuery } from "@tanstack/react-query";
import {
  fullFindingListSchema,
  type FullFinding,
} from "../../helpers/fullFindingSchema";

const fetchAllFindings = async (): Promise<FullFinding[]> => {
  const response = await fetch("/api/scan/findings", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch WordPress findings");
  }
  const json = await response.json();
  return fullFindingListSchema.parse(json.findings);
};

export const useAllFindings = () => {
  const query = useQuery<FullFinding[]>({
    queryKey: ["wordpress-findings"],
    queryFn: fetchAllFindings,
    staleTime: 15_000,
  });

  return {
    findings: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
};
