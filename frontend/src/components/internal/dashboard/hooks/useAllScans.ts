import { useQuery } from "@tanstack/react-query";

const fetchAllScans = async () => {
  const response = await fetch("/api/scan/all", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch all scans");
  }
  return response.json();
};

export const useAllScans = () => {
  const query = useQuery({
    queryKey: ["scans-all"],
    queryFn: fetchAllScans,
    staleTime: 15_000,
  });

  return {
    scans: query.data?.scans ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
};
