import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { systemPrompt } from "./utility/systemPrompt";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash", // or gemini-pro
  apiKey: process.env.GEMINI_API_KEY,
});


export async function callLanguageModelAPI(
  context: string,
  question: string,
): Promise<string> {
  const messages = [
    new SystemMessage(systemPrompt),

    new HumanMessage(`
Context:
-----------------------
${context}

-----------------------

Question:
${question}
`),
  ];

  const response = await model.invoke(messages);

  return response.content as string;
}
