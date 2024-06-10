import AuthUI from "@/components/AuthUI";
import Logo from "@/components/Logo";

export default function AuthScreen() {
  return (
    <div className="flex flex-col items-center h-screen bg-slate-900 text-white">
      <div className="flex w-full justify-center md:justify-start">
        <Logo />
      </div>
      <AuthUI />
    </div>
  );
}
