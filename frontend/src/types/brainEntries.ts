export interface BrainEntry {
  id: string | number;
  title: string;
  source: string;
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
        content: string;
        tags: { title: string }[];
    }[];
}

export interface NoteData {
  id: string;
  title: string;
  source: "YouTube" | "LinkedIn" | "Unknown Source";
  videoUrl?: string;
  linkedinPost?: string;
  date: string;
  content: string;
  tags: string[];
}
