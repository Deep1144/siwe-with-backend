import mongoose, { Document, ObjectId } from 'mongoose';

export interface IBaseModel {
  _id?: ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUser extends IBaseModel {
  lastLoginAt?: Date;
  name?: string;
  walletAddress: string;
}

export type IUserDocument = IUser & Document;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  walletAddress: {
    type: String,
    unique: true,
    required: true
  },
  lastLoginAt: {
    type: Date,
    default: new Date()
  }
}, {
  timestamps: true,
  collection: 'users'
})

export default mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema)
