"use client";
import React, { useState } from "react";
import Input from "./ui/Input";
import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Heading from "./ui/Heading";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitHandler = async (data: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/sign-up", data);
      toast.success(response.data.message);
      router.push("/");
    } catch (error: any) {
      console.log("Error while signing up.", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-300 mt-40 flex flex-col gap-24"
    >
      <Input
        name="email"
        placeholder="Email"
        type="email"
        rules={{
          required: "Email is required.",
        }}
        control={control}
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        control={control}
      />
      <Button variant="primary" isLoading={isLoading} type="submit">
        Sign up
      </Button>
      <Heading variant="headingSix" onClick={() => router.replace("/")} className="cursor-pointer">Already have an account? click here to login</Heading>
    </form>
  );
};

export default SignUpForm;
