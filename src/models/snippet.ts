import {Document, model, Model, Schema, SchemaDefinition, Types} from 'mongoose';
import {userModel} from './user';

export interface SnippetInterface {
  title: string;

  description: string;

  code: string;

  user: Types.ObjectId;

  upvotes: number;

  downvotes: number;
}

export interface SnippetDocument extends SnippetInterface, Document<Types.ObjectId> {};
export interface SnippetModelInterface extends Model<SnippetInterface> {};

const snippetDefinition: SchemaDefinition = {
  code: {
    required: true,
    type: String,
  },

  description: {
    required: true,
    type: String,
  },

  downvotes: {
    default: 0,
    type: Number,
  },

  title: {
    required: true,
    type: String,
  },

  upvotes: {
    default: 0,
    type: Number,
  },

  user: {
    ref: userModel.collection.name,
    required: true,
    type: Types.ObjectId,
  },
};

const schema = new Schema<SnippetInterface, SnippetModelInterface>(snippetDefinition, {
  collection: 'snippet',
  timestamps: true,
});

export const snippetModel = model<SnippetInterface, SnippetModelInterface>('snippet', schema);
