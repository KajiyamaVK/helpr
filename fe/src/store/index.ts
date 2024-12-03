import { configureStore, createSlice } from "@reduxjs/toolkit";

const chatModeSlice = createSlice({
  name:'chatMode',
  initialState: 'simpleChat',
  reducers:{}
})

interface UserData {
  userId: string;
  userName: string;
}

type Language = 'pt-BR' | 'en-US';

interface UiConfig {
  language: Language;
}

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    userData: {} as UserData,
    uiConfig: { language: 'pt-BR' } as UiConfig
  },
  reducers: {}
})

export const store = configureStore({
  reducer: {
    chatMode: chatModeSlice.reducer,
    general: generalSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
