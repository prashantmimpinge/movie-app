import { cn } from "@/lib/cn";
import { cva } from "class-variance-authority";
import React from "react";

const headingVariants = cva("text-white", {
  variants: {
    variant: {
      headingOne:
        "font-semibold leading-56 text-48 md:leading-80 md:text-64",
      headingTwo:
        "font-semibold leading-40 text-32 md:leading-56 md:text-48",
      headingThree:
        "font-semibold leading-32 text-24 md:leading-40 md:text-32",
      headingFour: "font-bold leading-32 text-24",
      headingFive: "font-bold leading-24 text-20",
      headingSix: "font-bold leading-24 text-16",
    },
  },
  defaultVariants: {
    variant: "headingThree",
  },
});

const Heading = ({
  children,
  variant,
  className,
  onClick,
}: {
  children: React.ReactNode;
  variant:
    | "headingOne"
    | "headingTwo"
    | "headingThree"
    | "headingFour"
    | "headingFive"
    | "headingSix";
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <h2
      className={cn(headingVariants({ variant, className }))}
      onClick={onClick}
    >
      {children}
    </h2>
  );
};

export default Heading;
