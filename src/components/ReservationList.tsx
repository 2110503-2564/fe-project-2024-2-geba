"use client";
import { removeReservation } from "@/redux/features/bookSlice";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function ReservationList() {
  const bookItems = useAppSelector((state) => state.bookSlice.reservationItems);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="mx-5 my-5">
      {bookItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No Co-Working Space Reservation
        </div>
      ) : (
        bookItems.map((item) => (
          <div
            key={item.user}
            className="bg-white rounded-lg px-5 py-3 my-3"
          >
            <div className="text-lg font-semibold">User: {item.user}</div>
            <div className="text-md">Reserve Date: {item.reserveDate}</div>
            <div className="text-md">Co-Working Space: {item.coWorkingSpace}</div>
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-2 py-1 text-white shadow-sm text-sm mt-1"
              onClick={() => dispatch(removeReservation(item))}
            >
              Cancel Reservation
            </button>
          </div>
        ))
      )}
    </div>
  );
}
