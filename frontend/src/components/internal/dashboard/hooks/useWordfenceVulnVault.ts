import { useQuery } from "@tanstack/react-query";

const fetchAllWordfenceVulnerabilities = async (page = 0, pageSize = 30) => {
  const from = page * pageSize;
  const to = from + pageSize - 1;
  const response = await fetch(`/api/wordfence/all?from=${from}&to=${to}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to load all wordfence vulnerabilities");
  }
  return response.json();
};

export const useWordfenceVulnVault = (page: number, pagesize = 30) => {
  const query = useQuery({
    queryKey: ["wordfence-all", page, pagesize],
    queryFn: () => fetchAllWordfenceVulnerabilities(page, pagesize),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  return {
    wordfenceVulnVault: query.data?.data ?? [],
    totalCount: query.data?.count ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
};
