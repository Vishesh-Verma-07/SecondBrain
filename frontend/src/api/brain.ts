import { GetAllResponse } from '../types/brainEntries'
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

