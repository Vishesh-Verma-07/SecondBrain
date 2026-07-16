// src/controllers/brain.controller.ts
import { Request, Response } from "express";
import { ContentModel, LinkModel } from "../models";
import { random } from "../utility/utils";
import { sendResponse } from "../utility/sendResponse";
import { getEmbedding, reduceEmbeddingDim } from "../embed";
import { getIndex } from "../pinecone";
import { callLanguageModelAPI } from "../lanchain";
import { Types } from "mongoose";


export const brainShare = async (req: Request, res: Response) => {
    const share = req.body.share;
    
    try {
        if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });
    
            if (existingLink) {
                sendResponse(res, 400, {
                    status: 'error',
                    message: "Link already exists",
                    data: {
                        hash: existingLink.hash
                    }
                });
                return;
            }
            
            const hash = random(14);
            await LinkModel.create({
                userId: req.userId,
                hash
            });
            
            sendResponse(res, 200, {
                status: 'success',
                message: "Link created successfully",
                data: {
                    hash
                }
            });
            return;
        } else {
            await LinkModel.deleteOne({
                userId: req.userId
            });
            
            sendResponse(res, 200, {
                status: 'success',
                message: "Link deleted successfully"
            });
            return;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            sendResponse(res, 500, {
                status: 'error',
                message: "Internal server error",
                error: error.message
        });
        return;
        }
    }
};

export const getBrainByShareLink = async (req: Request, res: Response) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {

        sendResponse(res, 411, {
            status: 'error',
            message: "This brain doesn't exist"
        });
        
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId
    }).populate("userId", '-password');

    if (content.length === 0) {
        sendResponse(res, 404, {
            status: 'error',
            message: "No content found for this brain"
        });
        return;
    }
    sendResponse(res, 200, {
        status: 'success',
        message: "Content fetched successfully",
        data: content
    });
};

export const brainSearch = async (req: Request, res: Response) => {
    const userId = req.userId;
    const {query} = req.body as {query: string};

    try {
        const index = getIndex();
        const embedding = await getEmbedding(query);
        // const reducedEmbedding = reduceEmbeddingDim(embedding, 2048);

        const searchResponse = await index.query({
            vector: embedding,
            topK: 5,
            includeMetadata: true,
            filter: {
                userId: userId
            }
        })

        const MIN_SCORE = 0.25;

        const contentIds =
            searchResponse.matches
                ?.filter(match => (match.score ?? 0) >= MIN_SCORE)
                .map(match => match.id) ?? [];

        const contents = await ContentModel.find({
            _id: { $in: contentIds }
        })
            // .populate("userId", "-password")
            .populate("tags", "title")
            .populate<{ category: categoryInterface }>("category");


            
            if (!contents.length) {
                return sendResponse(res, 200, {
                    status: "success",
                    message: "No relevant content found.",
                    data: {
                    answer: [],
                    llmSummary:
                        "I couldn't find anything in your Second Brain related to that."
                }
            });
        }
        
        
        const context = contents
        .map((content, index) => {

                const category = content.category as { name: string } | null;

                return `
                    Document ${index + 1}

                    Title: ${content.title}

                    Category: ${category?.name ?? "Uncategorized"}

                    Tags: ${
                        Array.isArray(content.tags)
                            ? content.tags.map((tag: any) => tag.title).join(", ")
                            : "None"
                    }

                    Content: ${content.content}
                    `;
                })
            .join("\n----------------------------------------\n");


        const llmSummary = await callLanguageModelAPI(
            context,
            query
        );

        sendResponse(res, 200, {
            status: "success",
            message: "Search results fetched successfully",
            data: {
                answer: contents,
                llmSummary
            }
        });

    } catch (error) {
        console.log(error);
        sendResponse(res, 500, {
            status: 'error',
            message: "Internal server error"
        });
    }
};

interface categoryInterface {
    _id: Types.ObjectId,
    name: string,
    user: Types.ObjectId,
    contents: Types.ObjectId
}

