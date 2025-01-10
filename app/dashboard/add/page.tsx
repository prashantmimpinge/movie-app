import MovieForm from "@/components/MovieForm";
import Heading from "@/components/ui/Heading";
import React from "react";

const AddMovie = () => {
  return (
    <div className="min-h-screen px-24 md:px-120 pt-80 md:pt-120 md:pb-56 pb-52">
      <div className="mb-80 md:mb-120 text-white">
        <Heading variant="headingTwo">Create a new movie</Heading>
      </div>
      <MovieForm />
    </div>
  );
};

export default AddMovie;
