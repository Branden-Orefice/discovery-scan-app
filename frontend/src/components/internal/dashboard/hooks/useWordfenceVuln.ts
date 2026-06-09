import { useQuery } from "@tanstack/react-query";

const fetchWordfenceVulnerabilityById = async (id: string) => {
  const response = await fetch(`/api/wordfence/vulnerabilities/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to load wordfence vulnerability");
  }
  const json = await response.json();
  return json.data;
};

export const useWordfenceVuln = (id: string) => {
  const query = useQuery({
    queryKey: ["wordfence-vuln", id],
    queryFn: () => fetchWordfenceVulnerabilityById(id),
    enabled: !!id,
    staleTime: 60_000,
  });

  return {
    vulnerability: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
