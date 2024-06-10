import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import Logo from "@/components/Header/Logo";
import { useEffect } from "react";
import getProfile from "@/utils/query-functions/getProfile";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const queryClient = useQueryClient();
  const AuthState = useSelector((state: RootState) => state.auth);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getProfile(AuthState.session?.user.id ?? null), // Add null check for AuthState.session
    queryKey: ["profile"], //Array according to Documentation
  });

  useEffect(() => {
    // invalidate the query when the session changes
    queryClient.invalidateQueries({ queryKey: ["profile"] }); // Pass the query key as an object
  }, [AuthState.session, queryClient]);

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

      <div className="flex items-center gap-2">
        {isLoading ? "" : isError ? "Error" : data?.username}
        <img
          src={AuthState.session.user.user_metadata.avatar_url || "/avatar.png"}
          alt="Avatar"
          height={32}
          width={32}
          className="w-8 h-8 rounded-full md:w-12 md:h-12"
        />
      </div>
    </div>
  );
}
