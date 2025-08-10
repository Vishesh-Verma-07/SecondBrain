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
