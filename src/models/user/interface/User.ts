import { Document, Types, model } from 'mongoose';
import { UserSchema } from '@src/models/user/schema/User';

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  name: string;
  surname?: string;
  password: string;
  email?: string;
  age?: number;
  phone?: string;
}

export default model<IUser>('User', UserSchema);
