import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: true,
    },
    surname: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    phone: {
      type: String,
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export { UserSchema };
