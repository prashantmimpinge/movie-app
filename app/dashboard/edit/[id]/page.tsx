import MovieForm from "@/components/MovieForm";
import Heading from "@/components/ui/Heading";
import React from "react";

const EditMovie = () => {

  return (
    <div className="min-h-screen px-24 md:px-120 pt-80 md:pt-120 md:pb-56 pb-52">
      <div className="mb-80 md:mb-120 text-white">
        <Heading variant="headingTwo">Edit</Heading>
      </div>
      <MovieForm />
    </div>
  );
};

export default EditMovie;
