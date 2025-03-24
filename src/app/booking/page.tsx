"use client";
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem, TextField } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ReservationItem } from "../../../interface";
import { addBooking } from "@/redux/features/bookSlice";
import dayjs, { Dayjs } from "dayjs";

export default async function Booking() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token)
    return (
      <main className="w-[100%] flex flex-col items-center space-y-4">
        <div className="font-semibold text-gray-600 text-xl text-center">
          Please Sign in
        </div>
      </main>
    );

  const profile = await getUserProfile(session.user.token);
  var createdAt = new Date(profile.data.createdAt);

  const dispatch = useDispatch<AppDispatch>();

  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [tel, setTel] = useState<string | null>(null)
  const [venue, setVenue] = useState<string>('Bloom')

  const createBooking = () => {
    if (reserveDate && name && tel && venue) {
      const item: BookingItem = {
        venue: venue,
        bookDate: dayjs(reserveDate).format("YYYY/MM/DD"),
        tel: tel,
        nameLastname: name,
      };
      dispatch(addBooking(item));
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-2xl font-bold">User Profile</div>
      <table className="table-auto border-separate border-spacing-2 bg-gray-300 rounded-xl p-4">
        <tbody>
          <tr>
            <td className="text-md font-semibold text-black">Name</td>
            <td>{profile.data.name}</td>
          </tr>
          <tr>
            <td className="text-md font-semibold text-black">Email</td>
            <td>{profile.data.email}</td>
          </tr>
          <tr>
            <td className="text-md font-semibold text-black">Tel.</td>
            <td>{profile.data.tel}</td>
          </tr>
          <tr>
            <td className="text-md font-semibold text-black">Member since</td>
            <td>{createdAt.toString()}</td>
          </tr>
        </tbody>
      </table>

      <div className="text-2xl font-bold">New Reservation</div>
      <div className="w-fit">
        <div className="text-md text-left font-semibold text-gray-600 mt-5">
          Booking Information
        </div>
        <TextField
          variant="standard"
          name="Name-Lastname"
          label="Name-Lastname"
          onChange={(e) => {setName(e.target.value)}}
        ></TextField>
        <br />
        <TextField
          variant="standard"
          name="Contact-Number"
          label="Contact-Number"
          onChange={(e) => {setTel(e.target.value)}}
        ></TextField>
        <div className="text-md text-left font-semibold text-gray-600 mt-5">
          Venue Selection
        </div>
        <Select variant="standard" id="venue" className="h-[2em] w-[200px]"
          value={venue}
          onChange={(e) => {setVenue(e.target.value as string)}}>
          <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
          <MenuItem value="Spark">Spark space</MenuItem>
          <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>
        <div className="text-md text-left font-semibold text-gray-600 mt-5">
          Reservation Date
        </div>
        <DateReserve onDateChange={(value:Dayjs) => {setReserveDate(value)}}/>
      </div>

      <button
        name="Book Venue"
        className="block rounded-md bg-sky-600 hover:bg-green-600 px-3 py-2 text-white shadow-sm"
        onClick={createBooking}
      >
        Book Venue
      </button>
    </main>
  );
}
