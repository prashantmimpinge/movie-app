"use client";
import React, { useState } from "react";
import Input from "./ui/Input";
import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import toast from "react-hot-toast";
import * as z from "zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Heading from "./ui/Heading";

const LoginForm = () => {
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
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast.error("Incorrect username or password");
      } else {
        toast.error(result.error);
      }
    }

    if (result?.url) {
      reset();
      toast.success("Logged in successfully!");
      router.replace("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-300 mt-40 flex flex-col gap-24"
    >
      <Input name="email" placeholder="Email" type="email" control={control} />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        control={control}
      />
      <div className="flex items-center justify-center gap-4">
        <input
          type="checkbox"
          name="remember"
          id="remember"
          className="bg-input outline-none border-none"
        />
        <label htmlFor="remember" className="text-white text-14 leading-24">
          Remember me
        </label>
      </div>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Heading variant="headingSix" onClick={() => router.replace("/sign-up")} className="cursor-pointer">Don't have any account? click here to signup</Heading>
    </form>
  );
};

export default LoginForm;
