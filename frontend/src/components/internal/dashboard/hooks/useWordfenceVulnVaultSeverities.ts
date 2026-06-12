import { useQuery } from "@tanstack/react-query";

const fetchAllWordfenceVulnerabilitySeverities = async () => {
  const response = await fetch("/api/wordfence/severities", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to load all wordfence vulnerability severities");
  }
  return response.json();
};

export const useWordfenceVulnVaultSeverities = () => {
  const query = useQuery({
    queryKey: ["wordfence-all-severities"],
    queryFn: fetchAllWordfenceVulnerabilitySeverities,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  return {
    severities: query.data?.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
};
