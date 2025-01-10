import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel, { User } from "@/model/User";

export async function GET(
  request: Request,
  context: { params: { movieId: string } }
) {
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
  const { movieId } = await context.params;

  if (!movieId) {
    return Response.json(
      {
        success: false,
        message: "Movie ID is required.",
      },
      { status: 400 }
    );
  }

  try {
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

    const movie = fetchedUser.movies.find(
      (movie) => movie?._id?.toString() === movieId
    );

    if (!movie) {
      return Response.json(
        {
          success: false,
          message: "Movie not found.",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Movie fetched successfully.",
        movie,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to fetch movie:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch movie.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { movieId: string } }
) {
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
  const { movieId } = await context.params;

  if (!movieId) {
    return Response.json(
      {
        success: false,
        message: "Movie ID is required.",
      },
      { status: 400 }
    );
  }

  try {
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

    const movie = fetchedUser.movies.find(
      (movie) => movie?._id?.toString() === movieId
    );

    if (!movie) {
      return Response.json(
        {
          success: false,
          message: "Movie not found.",
        },
        { status: 404 }
      );
    }

    const updatedData = await request.json();

    movie.title = updatedData.title || movie.title;
    movie.publishingYear = updatedData.publishingYear || movie.publishingYear;
    movie.poster = updatedData.poster || movie.poster;

    await fetchedUser.save();

    return Response.json(
      {
        success: true,
        message: "Movie updated successfully.",
        movie,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update movie:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to update movie.",
      },
      { status: 500 }
    );
  }
}
