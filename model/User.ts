import mongoose, { Schema, Document } from "mongoose";

export interface Movie extends Document {
  title: string;
  publishingYear: string;
  poster: string;
  createdAt: Date;
}

const MovieSchema: Schema<Movie> = new Schema({
  title: { type: String, required: true },
  publishingYear: { type: String, required: true },
  poster: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface User extends Document {
  email: string;
  password: string;
  movies: Movie[];
  createdAt: Date;
}

const UserSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    match: [/.+\@.+\..+/, "Please use a valid email address."],
    unique: true,
  },
  password: { type: String, required: [true, "Password is required."] },
  movies: [MovieSchema],
  createdAt: { type: Date, default: Date.now },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
