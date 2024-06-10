import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import Logo from "@/components/Header/Logo";

export default function Header() {
  const AuthState = useSelector((state: RootState) => state.auth);

  if (!AuthState.session) {
    return (
      <div className="flex justify-center w-full p-4 md:justify-start">
        <Logo />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full p-4 text-white bg-slate-900">
      <Logo />

      <div>
        <img
          src={AuthState.session.user.user_metadata.avatar_url}
          alt="Avatar"
          height={32}
          width={32}
          className="w-8 h-8 rounded-full md:w-12 md:h-12"
        />
      </div>
    </div>
  );
}
