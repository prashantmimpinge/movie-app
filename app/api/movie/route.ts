import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel, { Movie } from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  if (!session || !session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated.",
      },
      { status: 401 }
    );
  }

  const userId = user._id;

  try {
    const fetchedUser = await UserModel.findOne({
      _id: userId,
    });

    if (!fetchedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 404 }
      );
    }
    const { title, publishingYear, poster } = await request.json();
    const newMovie = { title, publishingYear, poster, createdAt: new Date() };
    fetchedUser.movies.push(newMovie as Movie);
    await fetchedUser.save();
    return Response.json(
      {
        success: true,
        message: "Movie added successfully!",
        movie: newMovie,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Failed to accept the movie data.");

    return Response.json(
      {
        success: false,
        message: "Failed to add the movie data.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (!session || !session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated.",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    const skip = (page - 1) * limit;

    const fetchedUser = await UserModel.findOne({ _id: userId });

    if (!fetchedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    const movies = fetchedUser.movies.slice(skip, skip + limit);

    const totalMovies = fetchedUser.movies.length;
    const totalPages = Math.ceil(totalMovies / limit);

    return Response.json(
      {
        success: true,
        message: "Movies fetched successfully.",
        movies,
        pagination: {
          currentPage: page,
          totalPages,
          totalMovies,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to fetch user or movies:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch movies.",
      },
      { status: 500 }
    );
  }
}
