import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { ThemeMode } from '@/styles/theme';

const THEME_STORAGE_KEY = 'theme_mode';

export interface ThemeState {
  mode: ThemeMode;
}

const getInitialMode = (): ThemeMode => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'dark';
};

const initialState: ThemeState = {
  mode: getInitialMode(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem(THEME_STORAGE_KEY, action.payload);
    },

    toggleThemeMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_STORAGE_KEY, state.mode);
    },
  },
});

export const { setThemeMode, toggleThemeMode } = themeSlice.actions;

export const selectThemeMode = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
