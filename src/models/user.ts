import {Document, Model, model, Schema, SchemaDefinition, Types} from 'mongoose';

export interface UserInterface {
  githubId: string;

  username: string;

  avatar: string;
}

export interface UserDocument extends UserInterface, Document<Types.ObjectId> {};
export interface UserModelInterface extends Model<UserInterface> {};

const definition: SchemaDefinition = {
  avatar: {
    type: String,
  },

  githubId: {
    required: true,
    type: String,
    unique: true,
  },

  username: {
    type: String,
  },
};

const schema = new Schema<UserInterface, UserModelInterface>(definition, {
  collection: 'user',
  timestamps: true,
});

export const userModel = model<UserInterface, UserModelInterface>('user', schema);
