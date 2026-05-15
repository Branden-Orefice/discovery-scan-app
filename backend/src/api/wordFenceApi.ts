import "dotenv/config";
import axios from "axios";

const API_KEY = process.env.WORDFENCE_INTEL_API_KEY;
const HOST_URL = process.env.WORDFENCE_INTEL_HOST_URL;

const WORDFENCE = axios.create({
  baseURL: HOST_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getWordfenceVulnerabilityData = async () => {
  try {
    const wordfenceResponse = await WORDFENCE.get(
      "/api/intelligence/v3/vulnerabilities/production",
    );

    return wordfenceResponse.data;
  } catch (error) {
    console.error("Error getting vulnerability data from wordfence:", error);
  }
};
