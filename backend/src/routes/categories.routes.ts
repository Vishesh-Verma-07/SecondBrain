import express from "express";
import { createCategory, getAllCollections, getCollectionById, updateCollection, deleteCollection } from "../controller/categories.controller";
import { auth } from "../middlewares/middleware"; // Assuming you have an auth middleware

const categoriesRouter = express.Router();

// Apply authentication middleware to all category routes
categoriesRouter.use(auth);

// Category routes
categoriesRouter.post("/createCategory", auth, createCategory);
categoriesRouter.get("/getAllCategories", auth, getAllCollections);
categoriesRouter.get("/getCategoryById/:categoryId", auth, getCollectionById);
categoriesRouter.put("/updateCategory/:categoryId", auth, updateCollection);
categoriesRouter.delete("/deleteCategory/:categoryId", auth, deleteCollection);

export {
    categoriesRouter
};
