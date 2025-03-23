"use client";
import { removeBooking } from "@/redux/features/bookSlice";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function BookingList() {
  const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="mx-5 my-5">
      {bookItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No Venue Booking
        </div>
      ) : (
        bookItems.map((item) => (
          <div
            key={item.nameLastname}
            className="bg-white rounded-lg px-5 py-3 my-3"
          >
            <div className="text-lg font-semibold">Name: {item.nameLastname}</div>
            <div className="text-md">Tel: {item.tel}</div>
            <div className="text-sm">Venue: {item.venue}</div>
            <div className="text-sm">Reserve for {item.bookDate}</div>
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-2 py-1 text-white shadow-sm text-sm mt-1"
              onClick={() => dispatch(removeBooking(item))}
            >
              Cancel Reservation
            </button>
          </div>
        ))
      )}
    </div>
  );
}
