import LoginForm from "@/components/LoginForm";
import Heading from "@/components/ui/Heading";

export default function Login() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-white">
      <Heading variant="headingOne">Sign in</Heading>
      <LoginForm />
    </div>
  );
}
