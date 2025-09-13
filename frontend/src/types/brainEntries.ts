export interface BrainEntry {
  id: string | number;
  title: string;
  source: string;
  category: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface GetAllResponse {
    status: string;
    message?: string;
    data: {
        _id: string;
        title: string;
        link: string;
        createdAt: string;
        category: { _id: string; name: string };
        content: string;
        tags: { title: string }[];
    }[];
}

export interface NoteData {
  id: string;
  title: string;
  collection: "YouTube" | "LinkedIn" | "Unknown Source";
  videoUrl?: string;
  linkedinPost?: string;
  link?: string;
  date: string;
  content: string;
  tags: string[];
}
