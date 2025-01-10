"use client";
import { cn } from "@/lib/cn";
import React from "react";
import { Controller } from "react-hook-form";

const Input = ({
  name,
  control,
  rules,
  defaultValue = "",
  className = "w-full",
  label,
  type = "text",
  variant = "default",
  placeholder = " ",
}: {
  name: string;
  control: any;
  rules?: any;
  defaultValue?: any;
  className?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  variant?: "default";
}) => {
  const variants = {
    default: {
      input:
        "h-11 w-full pl-4 outline-none bg-input text-white rounded-[10px] focus:border-2 focus:border-input focus:bg-transparent",
      label: "text-input mb-8 text-12 leading-16",
    },
  };

  const errorClasses = {
    input: "h-11 w-full pl-4 outline-none bg-input text-white rounded-[10px] border-2 bg-transparent border-error",
    label: "text-input mb-8 text-12 leading-16 text-error",
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={className}>
          <div className={`relative w-full min-w-[150px]`}>
            <input
              {...field}
              className={cn(
                error ? errorClasses.input : variants[variant].input
              )}
              placeholder={placeholder}
              type={type}
            />
            {label && (
              <label
                className={cn(
                  error ? errorClasses.label : variants[variant].label
                )}
              >
                {label}
              </label>
            )}
          </div>
          {error && (
            <p className="text-error mt-8 text-12 leading-16">
              {error.message || "Error"}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default Input;
