import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: "",
  startDate: null,
  startTime: null,
  endTime: "",
  title: "",
  description: "",
  phone: "",
  telegramId: "",
};

export const counterSlice = createSlice({
  name: "eventBook",
  initialState,
  reducers: {
    changeRoom: (state, payload) => {
      state.room = payload.payload;
    },
    changeStartDate: (state, payload) => {
      state.startDate = payload.payload;
    },
    changeStartTime: (state, payload) => {
      state.startTime = payload.payload;
    },
    changeEndTime: (state, payload) => {
      state.endTime = payload.payload;
    },
    changeTitle: (state, payload) => {
      state.title = payload.payload;
    },
    changeDescription: (state, payload) => {
      state.description = payload.payload;
    },
    changePhone: (state, payload) => {
      state.phone = payload.payload;
    },
    changeTelegramId: (state, payload) => {
      state.telegramId = payload.payload;
    },
  },
});

export const {
  changeRoom,
  changeStartDate,
  changeStartTime,
  changeEndTime,
  changeTitle,
  changeDescription,
  changePhone,
  changeTelegramId,
} = counterSlice.actions;
export default counterSlice.reducer;
