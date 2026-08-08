import { Types } from "mongoose";

export interface TagInterface {
  _id: Types.ObjectId;
  title: string;
}

export interface categoryInterface {
  _id: Types.ObjectId;
  name: string;
  user: Types.ObjectId;
  contents: Types.ObjectId;
}
