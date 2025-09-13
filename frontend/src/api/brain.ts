import { GetAllResponse, NoteData } from '../types/brainEntries'
import api from './axiosInstance'



export const fetchBrainEntries = async (): Promise<any>=> {
    const response = await api.get<GetAllResponse>("/content/getAll");

    console.log("Response received:", response.data);

    return response.data.data.map((entry) => ({
      id: entry._id,
      title: entry.title || "Untitled",
      source: entry.link || "Unknown Source",
      category: entry.category?.name || "Uncategorized",
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

  let collectionType: NoteData["collection"] = "Unknown Source";
  let videoUrl = "";
  let linkedinPost = "";
  let link = entry.link || "";

  if (entry.link?.includes("youtube.com") || entry.link?.includes("youtu.be")) {
    collectionType = "YouTube";
    videoUrl = entry.link;
  } else if (entry.link?.includes("linkedin.com")) {
    collectionType = "LinkedIn";
    linkedinPost = entry.link;
  }
  else{
    collectionType = "Unknown Source";
  }

  return {
    id: entry._id,
    title: entry.title || "Untitled",
    collection: collectionType,
    videoUrl,
    linkedinPost,
    link,
    date: entry.createdAt
      ? new Date(entry.createdAt).toLocaleDateString()
      : "",
    content: entry.content || "",
    tags: entry.tags.map((tag: { title: string }) => tag.title),
  };
};


export const createBrainEntry = async (noteData: NoteData): Promise<void> => {
  const response = await api.post("/content/create", noteData);

  if (response.status !== 201) {
    throw new Error("Failed to create brain entry");
  }
};

export const deleteBrainEntry = async (id: string): Promise<void> => {
  const response = await api.delete(`/content/deleteContent/${id}`);

  if (response.status !== 200) {
    throw new Error("Failed to delete brain entry");
  }
};