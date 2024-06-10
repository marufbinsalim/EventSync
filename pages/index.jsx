import AuthUI from "@/components/AuthUI";
import { Star } from "lucide-react";

export default function AuthenticationScreen() {
  return (
    <div className="flex flex-col items-center h-screen bg-slate-900 text-white">
      <div className="bg-red-300 w-full flex justify-center p-4">
        <Star size={32} />
      </div>
      <AuthUI />
    </div>
  );
}
