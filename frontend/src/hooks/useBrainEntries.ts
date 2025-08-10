// src/features/brain/useBrainEntries.ts
import { fetchBrainEntries } from "../api/brain";
import { BrainEntry } from "../types/brainEntries";
import { useQuery } from "@tanstack/react-query";
    

export function useBrainEntries() {
  return useQuery<BrainEntry[], Error>({
    queryKey: ["brainEntries"],
    queryFn: fetchBrainEntries,
    staleTime: 5 * 60 * 1000, // cache 5 mins
    retry: 2, // retry twice on error
  });
}
