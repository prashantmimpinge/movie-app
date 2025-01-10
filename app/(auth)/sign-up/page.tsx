import SignUpForm from "@/components/SignUpForm";
import Heading from "@/components/ui/Heading";
import React from "react";

const SignUp = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-white">
      <Heading variant="headingOne">Sign up</Heading>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
