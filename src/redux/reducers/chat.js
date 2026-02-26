import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatNotificationCount: 0,
  newMessageAlert: [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotification: (state, action) => {
      state.chatNotificationCount += 1;
    },
    resetNotifications: (state, action) => {
      state.chatNotificationCount = 0;
    },
    setMessagesAlert: (state, action) => {
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === action.payload.chatId,
      );
      if (index !== -1) {
        state.newMessageAlert[index].count += 1;
      } else {
        state.newMessageAlert.push({ chatId: action.payload.chatId, count: 1 });
      }
    },
    removeNewMessagesAlert: (state, action) => {
      state.newMessageAlert = state.newMessageAlert.filter(item=> item.chatId !== action.payload)
    },
  },
});

export default chatSlice;
export const { incrementNotification, resetNotifications, setMessagesAlert,removeNewMessagesAlert } =
  chatSlice.actions;
