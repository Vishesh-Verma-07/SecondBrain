import { GetAllResponse, NoteData } from '../types/brainEntries'
import api from './axiosInstance'



export const fetchBrainEntries = async (): Promise<any>=> {
    const response = await api.get<GetAllResponse>("/content/getAll");

    console.log("Response received:", response.data);

    return response.data.data.map((entry) => ({
      id: entry._id,
      title: entry.title || "Untitled",
      source: entry.link || "Unknown Source",
      date: entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : "",
      excerpt: entry.content?.slice(0, 150) + (entry.content?.length > 150 ? "..." : ""),
      tags: entry.tags.map(tag => tag.title)
    }))
}

export const fetchBrainEntryDetail = async (id: string): Promise<NoteData> => {
  const response = await api.get(`/content/getPostDetail/${id}`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch brain entry details");
  }
  // @ts-ignore
  const entry = response.data.data;

  let sourceType: NoteData["source"] = "Unknown Source";
  let videoUrl = "";
  let linkedinPost = "";

  if (entry.link?.includes("youtube.com") || entry.link?.includes("youtu.be")) {
    sourceType = "YouTube";
    videoUrl = entry.link;
  } else if (entry.link?.includes("linkedin.com")) {
    sourceType = "LinkedIn";
    linkedinPost = entry.link;
  }

  return {
    id: entry._id,
    title: entry.title || "Untitled",
    source: sourceType,
    videoUrl,
    linkedinPost,
    date: entry.createdAt
      ? new Date(entry.createdAt).toLocaleDateString()
      : "",
    content: entry.content || "",
    tags: entry.tags.map((tag: { title: string }) => tag.title),
  };
};

export const deleteBrainEntry = async (id: string): Promise<void> => {
  const response = await api.delete(`/content/deleteContent/${id}`);

  if (response.status !== 200) {
    throw new Error("Failed to delete brain entry");
  }
};