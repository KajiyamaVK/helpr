import { configureStore, createSlice } from "@reduxjs/toolkit";

const chatModeSlice = createSlice({
  name:'chatMode',
  initialState: 'simpleChat',
  reducers:{}
})

export const store = configureStore({
  reducer: {
    chatMode: chatModeSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
