// src/features/brain/useBrainEntries.ts
import { deleteBrainEntry, fetchBrainEntries, fetchBrainEntryDetail } from "../api/brain";
import { BrainEntry } from "../types/brainEntries";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { NoteData } from "../types/brainEntries";

export function useBrainEntries() {
  return useQuery<BrainEntry[], Error>({
    queryKey: ["brainEntries"],
    queryFn: fetchBrainEntries,
    staleTime: 5 * 60 * 1000, // cache 5 mins
    retry: 2, // retry twice on error
  });
}

export function useBrainEntryDetail(id: string): UseQueryResult<NoteData> {
  return useQuery<NoteData, Error>({
    queryKey: ["brainEntry", id],
    queryFn: () => fetchBrainEntryDetail(id),
    staleTime: 5 * 60 * 1000, // cache 5 mins
    retry: 2, // retry twice on error
  });
}

export function useDeleteBrainEntry(){
  return useMutation<void, Error, string>({
    mutationFn: deleteBrainEntry,
    onSuccess: () => {
      // Invalidate and refetch
    },
  });
}