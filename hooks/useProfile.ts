import { RootState } from "@/state/store";
import getProfile from "@/utils/query-functions/getProfile";
import { User } from "@/utils/query-functions/getProfile";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useProfile() {
  const queryClient = useQueryClient();
  const AuthState = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const saveUpdatedUserName = async () => {
    if (AuthState.session?.user?.id && username) {
      await fetch("/api/update-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: AuthState.session.user.id,
          username,
        }),
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      setIsFetching(true);
      let data = await getProfile(AuthState.session?.user?.id ?? null);
      setIsFetching(false);
      return data;
    }, // Add null check for AuthState.session and AuthState.session.user
    queryKey: ["profile"], //Array according to Documentation
  });

  useEffect(() => {
    // invalidate the query when the session changes
    queryClient.invalidateQueries({ queryKey: ["profile"] }); // Pass the query key as an object
  }, [AuthState.session, queryClient]);

  useEffect(() => {
    if (data) {
      setUsername(data.username);
    }
  }, [data]);

  // Add your code here
  return {
    data: {
      user: data,
      session: AuthState.session,
      updatebleLocalStates: {
        username,
      },
      updateLocalStates: {
        setUsername,
        saveUpdatedUserName,
      },
    },
    isLoading: isLoading || AuthState.isLoading || isFetching,
    isError,
  };
}
