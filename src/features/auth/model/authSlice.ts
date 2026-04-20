import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setTokens, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
