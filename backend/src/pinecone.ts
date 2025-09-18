import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

export const getIndex = () => {
  return pinecone.index(
    process.env.PINECONE_INDEX_NAME as string,
    process.env.PINECONE_URL as string
  );
};
