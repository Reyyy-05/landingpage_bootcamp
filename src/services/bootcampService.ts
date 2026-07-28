import type { Bootcamp, ApiSuccess, ApiError } from "@/types";
import { logger } from "@/lib/logger";

export async function fetchPublicBootcamps(): Promise<Bootcamp[]> {
  try {
    const res = await fetch("/api/bootcamps-public", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorJson: ApiError = await res.json().catch(() => ({ error: "Failed to fetch bootcamps" }));
      logger.warn("Failed to fetch public bootcamps API response", "BootcampService", errorJson);
      return [];
    }

    const json: ApiSuccess<Bootcamp[]> = await res.json();
    return json.data ?? [];
  } catch (error) {
    logger.error("Network or unexpected error in fetchPublicBootcamps", "BootcampService", error);
    return [];
  }
}
