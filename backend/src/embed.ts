import { model } from "mongoose";
// import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PCA } from "ml-pca";


const genAi = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY as string
);

export function reduceEmbeddingDim(embedding: number[], targetDim = 2048): number[] {
  // PCA expects a 2D array, so wrap the embedding
  const pca = new PCA([embedding]);

  // Project into target dimension
  const reduced = pca.predict([embedding], { nComponents: targetDim }).to2DArray();

  return reduced[0]; // return as 1D vector
}


export async function getEmbedding(text: string): Promise<number[]> {
  const model = genAi.getGenerativeModel({ model: "gemini-embedding-001" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}