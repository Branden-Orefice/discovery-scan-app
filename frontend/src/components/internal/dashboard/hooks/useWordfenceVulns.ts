import { useQuery } from "@tanstack/react-query";

const fetchWordfenceVulnerabilities = async () => {
  const response = await fetch("/api/wordfence/latest", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to load wordfence vulnerabilities");
  }
  return response.json();
};

export const useWordfenceVulns = () => {
  const query = useQuery({
    queryKey: ["wordfence-latest"],
    queryFn: fetchWordfenceVulnerabilities,
    staleTime: 15_000,
  });

  return {
    wordfenceVulns: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
};
