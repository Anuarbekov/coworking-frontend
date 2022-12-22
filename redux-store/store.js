import { configureStore } from "@reduxjs/toolkit";
import eventBookReducer from "./features/eventBook/counterSlice";
export const store = configureStore({
  reducer: {
    eventBook: eventBookReducer},
});
