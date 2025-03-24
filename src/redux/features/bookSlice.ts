import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interface";

type BookState = {
  reservationItems : ReservationItem[];
};

const initialState: BookState = { reservationItems : [] };

export const bookSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<ReservationItem>) => {
      const replace = state.reservationItems .find
        (booking => booking.reserveDate === action.payload.reserveDate && booking.coWorkingSpace === action.payload.coWorkingSpace)
      if (replace) {
        replace.user = action.payload.user;
      } else {
        state.reservationItems .push(action.payload);
      }
    },
    removeBooking: (state, action: PayloadAction<ReservationItem>) => {
      const RemainItems = state.reservationItems .filter((obj) => {
        return (
          (obj.reserveDate !== action.payload.reserveDate) ||
          (obj.user !== action.payload.user) ||
          (obj.coWorkingSpace !== action.payload.coWorkingSpace)
        );
      });
      state.reservationItems  = RemainItems;
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
