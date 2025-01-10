import React from "react";
import Paragraph from "../ui/Paragraph";
import Link from "next/link";
import { Movie } from "@/model/User";

const Card = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      href={`/dashboard/edit/${movie?._id}`}
      className="bg-card hover:bg-cardHover backdrop-blur-sm rounded-xl p-8"
    >
      <div className="flex items-center justify-center overflow-hidden rounded-xl h-[246px] md:h-[400px]">
        <img
          className="h-full object-cover"
          src={movie?.poster ? movie?.poster : "/banner-01.jpeg"}
          alt={movie?.title ? movie?.title : "movie banner"}
        />
      </div>
      <div className="mt-16 text-white">
        <Paragraph variant="bodyLarge">{movie?.title}</Paragraph>
        <Paragraph variant="bodySmall">{movie?.publishingYear}</Paragraph>
      </div>
    </Link>
  );
};

export default Card;
