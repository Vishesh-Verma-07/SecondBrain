import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash", // or gemini-pro
  apiKey: process.env.GEMINI_API_KEY,
});

export async function callLanguageModelAPI(prompt: string): Promise<string> {
    const msg = [
        new SystemMessage("You are a helpful Second Brain assistant. Use the given context only."),
        new HumanMessage(prompt),
    ]

    const response = await model.invoke(msg);
    return response.content as string;
}
