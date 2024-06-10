import { RootState } from "@/state/store";
import getProfile from "@/utils/query-functions/getProfile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useProfile() {
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

  // Add your code here
  return {
    data: {
      user: data,
      session: AuthState.session,
    },
    isLoading: isLoading || AuthState.isLoading,
    isError,
  };
}
