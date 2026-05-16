export const withRetry = async <T>(
  fn: () => Promise<T>,
  {
    retries,
    baseDelayMs,
    label,
  }: {
    retries: number;
    baseDelayMs: number;
    label: string;
  },
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === retries) break;

      const delay = baseDelayMs * 2 ** attempt;

      console.warn(
        `[${label}] attempt ${attempt + 1} failed → retrying in ${delay}ms`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};

export const assertValidUrl = (value: string): string => {
  const url = new URL(value);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Target must be HTTP or HTTPS");
  }

  return url.toString();
};
