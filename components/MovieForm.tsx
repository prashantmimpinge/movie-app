"use client";
import React, { useEffect, useState } from "react";
import FileInput from "./ui/FileInput";
import { useForm } from "react-hook-form";
import Input from "./ui/Input";
import Button from "./ui/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { movieSchema } from "@/schemas/movieSchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Movie } from "@/model/User";

const MovieForm = () => {
  const [poster, setPoster] = useState<File[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`/api/movie/${params.id}`);
      if (response.data?.movie) {
        setMovie(response.data.movie);
        setValue("title", response?.data?.movie?.title);
        setValue("publishingYear", response?.data?.movie?.publishingYear);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchMovie();
    }
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof movieSchema>>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: movie?.title ? movie?.title : "",
      publishingYear: movie?.publishingYear ? movie?.publishingYear : "",
    },
  });

  function uploadFiles(files: File[]) {
    setPoster([...poster, ...files]);
  }

  function deleteFile(indexImg: number) {
    const updatedList = poster.filter((_file, index) => index !== indexImg);
    setPoster(updatedList);
  }

  const submitHandler = async (data: z.infer<typeof movieSchema>) => {
    setIsLoading(true);

    try {
      let posterUrl = movie?.poster ?? "";
      let response = null;

      if (poster.length > 0) {
        const file = poster[0];

        if (file instanceof File) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDNARY_PRESET!
          );
          formData.append(
            "cloud_name",
            process.env.NEXT_PUBLIC_CLOUDNARY_NAME!
          );

          const cloudinaryRes = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env
              .NEXT_PUBLIC_CLOUDNARY_NAME!}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const cloudinaryData = await cloudinaryRes.json();

          if (cloudinaryData.secure_url) {
            posterUrl = cloudinaryData.secure_url;
          } else {
            throw new Error("Failed to get secure_url from Cloudinary.");
          }
        } else {
          throw new Error("Invalid file format or file not found.");
        }
      }

      if (movie?._id) {
        response = await axios.put(`/api/movie/${movie?._id}`, {
          ...data,
          poster: posterUrl,
        });
      } else {
        response = await axios.post("/api/movie", {
          ...data,
          poster: posterUrl,
        });
      }

      reset();
      toast.success(response?.data?.message);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error while submitting movie form.", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full flex flex-col md:flex-row gap-8 text-white"
    >
      <div className="w-full md:w-1/2 hidden md:block pr-0 md:pr-160">
        <FileInput
          poster={poster}
          onUpload={uploadFiles}
          onDelete={deleteFile}
          count={1}
          formats={["jpg", "jpeg", "png"]}
        />
      </div>

      <div className="w-full md:w-96 flex flex-col gap-4">
        <Input name="title" placeholder="Title" control={control} />
        <Input
          name="publishingYear"
          placeholder="Publish Year"
          className="w-full md:w-2/3 mt-0 md:mt-24"
          control={control}
        />

        <div className="block md:hidden">
          <FileInput
            poster={poster}
            onUpload={uploadFiles}
            onDelete={deleteFile}
            count={1}
            formats={["jpg", "jpeg", "png"]}
          />
        </div>

        <div className="flex gap-16 items-center justify-between mt-64">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              router.push("/dashboard");
            }}
            className="w-full"
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MovieForm;
