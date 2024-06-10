import AuthUI from "@/components/AuthUI";
import Logo from "@/components/Logo";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export default function AuthScreen() {
  const authState = useSelector((state: RootState) => state.auth);
  console.log(authState.session);

  if (authState.isLoading) {
    return <div>Loading...</div>;
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
