import { cn } from "@/lib/cn";
import { cva } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "flex gap-2 items-center justify-center rounded-[10px] disabled:pointer-events-none disabled:opacity-50 text-16 font-bold leading-24 text-white",
  {
    variants: {
      variant: {
        primary: "bg-primary border-none outline-none",
        secondary: "bg-transparent border border-white outline-none",
      },
      size: {
        default: "h-14",
        small: "h-[54px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = ({
  isLoading,
  children,
  variant,
  className,
  onClick,
  size = "default",
  type = "submit",
  disabled = false,
}: {
  isLoading?: boolean;
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  size?: "default" | "small";
  type?: "submit" | "button";
  disabled?: boolean;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {children}
    </button>
  );
};

export default Button;
