import { createSlice } from "@reduxjs/toolkit";
import type { Session } from "@supabase/supabase-js";

type AuthState = {
  session: Session | null;
  isLoading: boolean;
};

const initialState: AuthState = {
  session: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: { payload: AuthState }) => {
      let { session, isLoading } = action.payload;
      state.session = session;
      state.isLoading = isLoading;
    },
  },
});

export default authSlice.reducer;
export const { setAuthState } = authSlice.actions;
