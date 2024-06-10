import AuthUI from "@/components/AuthUI";
import Logo from "@/components/Logo";
import { RootState } from "@/state/store";
import { CircleDashed } from "lucide-react";
import { useSelector } from "react-redux";

export default function AuthScreen() {
  const authState = useSelector((state: RootState) => state.auth);

  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-slate-900">
        <CircleDashed className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-screen text-white bg-slate-900">
      <div className="flex justify-center w-full md:justify-start">
        <Logo />
      </div>
      <AuthUI />
    </div>
  );
}
