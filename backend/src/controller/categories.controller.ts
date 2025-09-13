import { Request, Response } from "express";
import { categoryModel } from "../models/categories.model";
import { ContentModel, UserModel } from "../models";
import { sendResponse } from "../utility/sendResponse";


export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const userId = req.userId;
        const newCategory = await categoryModel.create({ name, user: userId });
        if(!newCategory) {
            return sendResponse(res, 400, {
                status: 'error',
                message: "Failed to create collection"
            });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $push: { categories: newCategory._id } },
            { new: true }
        );
        
        if (!updatedUser) {
            return sendResponse(res, 404, {
                status: 'error',
                message: 'User not found'
            });
        }

        sendResponse(res, 201, {
            status: 'success', 
            message: "Category created successfully",
            data: newCategory
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: 'error',
            message: error.message
        });
    }
};

export const getAllCollections = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId).populate('categories');
        if (!user) {
            sendResponse(res, 404, {
                status: 'error',
                message: 'User not found'
            });
            return
        }
        sendResponse(res, 200, {
            status: 'success',
            message: 'Categories retrieved successfully',
            data: user.categories
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: 'error',
            message: error.message
        });
    }
};

export const getCollectionById = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const userId = req.userId;
        const user = await UserModel.findById(userId).populate('categories');

        if (!user) {
            sendResponse(res, 404, {
                status: 'error',
                message: 'User not found'
            });
            return;
        }
        const category = user.categories.find(
            (category: any) => category._id.toString() === categoryId
        )
        if (!category) {
            sendResponse(res, 404, {
                status: 'error',
                message: 'Category not found'
            });
            return;
        }
        sendResponse(res, 200, {
            status: 'success',
            message: 'Category retrieved successfully',
            data: category
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: 'error',
            message: error.message
        });
    }
};

export const updateCollection = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const userId = req.userId;
        const { name } = req.body;
        const user = await UserModel.findById(userId).populate('categories');
        if (!user) {
            sendResponse(res, 404, {
                status: 'error',
                message: 'User not found'
            });
            return;
        }
        const updatedCategory = await categoryModel.findOneAndUpdate(
            { _id: categoryId, user: userId },
            { name },
            { new: true }
        );

        if (!updatedCategory) {
            sendResponse(res, 404, {
            status: 'error',
            message: 'Category not found'
            });
            return;
        }

        const category = updatedCategory;

        sendResponse(res, 200, {
            status: 'success',
            message: 'Category updated successfully',
            data: category
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: 'error',
            message: error.message
        });
    }
}

export const deleteCollection = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const userId = req.userId;
        const user = await UserModel.findById(userId).populate('categories');
        if (!user) {
            sendResponse(res, 404, {
                status: 'error',
                message: 'User not found'
            });
            return;
        }
        const deletedCategory = await categoryModel.findOneAndDelete({ _id: categoryId, user: userId });
        if (!deletedCategory) {
            sendResponse(res, 404, {
                status: 'error',
                message: 'Category not found'
            });
            return;
        }

        await UserModel.findByIdAndUpdate(userId, { $pull: { categories: categoryId } });

        sendResponse(res, 200, {
            status: 'success',
            message: 'Category deleted successfully',
            data: deletedCategory
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: 'error',
            message: error.message
        });
    }
};

export const getAllContentForCollectionById = async (req: Request, res: Response) => {
    try {
        const { collectionId } = req.params;
        const userId = req.userId;

        const contents = await categoryModel.findById(collectionId).populate('contents');
        if (!contents) {
            sendResponse(res, 404, {
                status: 'error',
                message: 'No contents found for this category'
            });
            return;
        }

        sendResponse(res, 200, {
            status: 'success',
            message: 'Contents retrieved successfully',
            data: contents
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: 'error',
            message: error.message
        });
    }
};
