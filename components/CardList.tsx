"use client";
import React, { useEffect, useState } from "react";
import Card from "./shared/Card";
import axios from "axios";
import Paragraph from "./ui/Paragraph";
import Header from "./shared/Header";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";

const CardList = () => {
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const fetchMovies = async (page: number) => {
    try {
      const response = await axios.get("/api/movie", {
        params: { page, limit: 8 },
      });
      if (response.data?.movies) {
        setMovies(response.data.movies);
        setPagination(response.data.pagination);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (!pagination) return null;

    const { currentPage, totalPages } = pagination;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="w-full flex items-center justify-center mt-160">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-10 items-center justify-center px-3 ms-0 leading-tight text-white"
            >
              <Paragraph variant="bodyRegular">Prev</Paragraph>
            </button>
          </li>

          {pageNumbers.map((page) => (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page)}
                className={`flex items-center justify-center rounded-md px-16 h-10 text-white mx-4 ${
                  currentPage === page ? "bg-primary" : "bg-card"
                }`}
              >
                <Paragraph variant="bodyRegular">{page}</Paragraph>
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex h-10 items-center justify-center px-3 ms-0 leading-tight text-white"
            >
              <Paragraph variant="bodyRegular">Next</Paragraph>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return movies && movies?.length > 0 ? (
    <>
      <Header />
      <div className="mt-80 md:mt-120 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-24">
        {movies?.map((movie, index) => (
          <Card key={index} movie={movie} />
        ))}
      </div>
      {renderPagination()}
    </>
  ) : (
    <div className="w-full flex flex-col items-center justify-center text-white mt-[10%] text-center">
      <Heading variant="headingTwo">Your movie list is empty</Heading>
      <Button className="px-10 mt-10" variant="primary" onClick={() => router.push("/dashboard/add")}>Add a new movie</Button>
    </div>
  );
};

export default CardList;
