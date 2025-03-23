import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

type BookState = {
  bookItems: BookingItem[];
};

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const replace = state.bookItems.find
        (booking => booking.bookDate === action.payload.bookDate && booking.venue === action.payload.venue)
      if (replace) {
        replace.nameLastname = action.payload.nameLastname;
        replace.tel = action.payload.tel;
      } else {
        state.bookItems.push(action.payload);
      }
    },
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      const RemainItems = state.bookItems.filter((obj) => {
        return (
          (obj.bookDate !== action.payload.bookDate) ||
          (obj.nameLastname !== action.payload.nameLastname) ||
          (obj.tel !== action.payload.tel) ||
          (obj.venue !== action.payload.venue)
        );
      });
      state.bookItems = RemainItems;
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
