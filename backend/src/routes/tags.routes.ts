import express from 'express';
import { createTag, getAllTags, getTagById, updateTag, deleteTag } from '../controller/tag.controller';

const TagRouter = express.Router();

TagRouter.post('/createTag', createTag);
TagRouter.get('/getAllTags', getAllTags);
TagRouter.get('/getTagById/:id', getTagById);
TagRouter.put('/updateTag/:id', updateTag);
TagRouter.delete('/deleteTag/:id', deleteTag);

export {
    TagRouter
};
