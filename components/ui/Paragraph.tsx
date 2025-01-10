import { cn } from "@/lib/cn";
import { cva } from "class-variance-authority";
import React from "react";

const paragraphVariants = cva("text-white", {
  variants: {
    variant: {
      bodyLarge: "leading-32 text-20",
      bodyRegular: "leading-24 text-16",
      bodySmall: "leading-24 text-14",
      bodyExtraSmall: "leading-24 text-12",
      caption: "leading-16 text-14",
    },
  },
  defaultVariants: {
    variant: "bodyRegular",
  },
});

const Paragraph = ({
  children,
  variant,
  className,
}: {
  children: React.ReactNode;
  variant:
    | "bodyLarge"
    | "bodyRegular"
    | "bodySmall"
    | "bodyExtraSmall"
    | "caption";
  className?: string;
}) => {
  return (
    <p className={cn(paragraphVariants({ variant, className }))}>{children}</p>
  );
};

export default Paragraph;
