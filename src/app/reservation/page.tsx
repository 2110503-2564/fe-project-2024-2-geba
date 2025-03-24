"use client";
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem, TextField } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addReservation } from "@/redux/features/bookSlice";
import dayjs, { Dayjs } from "dayjs";
import { ReservationItem } from "../../../interface";

export default async function Reservation() {
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
  const [user, setUser] = useState<string | null>(null)
  const [coWorkingSpace, setCoWorkingSpace] = useState<string>('Bloom') //change name

  const createReservation = () => {
    if (user && reserveDate && coWorkingSpace ) {
      const item: ReservationItem = {
        coWorkingSpace: coWorkingSpace,
        reserveDate: dayjs(reserveDate).format("YYYY/MM/DD"),
        user : user
      };
      dispatch(addReservation(item));
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
          Reservation Information
        </div>
        <TextField
          variant="standard"
          name="User"
          label="User"
          onChange={(e) => {setUser(e.target.value)}}
        ></TextField>
        <br />
        <div className="text-md text-left font-semibold text-gray-600 mt-5">
          CoWorkingSpace Selection
        </div>
        <Select variant="standard" id="CoWorkingSpace" className="h-[2em] w-[200px]"
          value={coWorkingSpace}
          onChange={(e) => {setCoWorkingSpace(e.target.value as string)}}>
          <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
          <MenuItem value="Spark">Spark space</MenuItem>
          <MenuItem value="GrandTable">The Grand Table</MenuItem>//
        </Select>
        <div className="text-md text-left font-semibold text-gray-600 mt-5">
          Reservation Date
        </div>
        <DateReserve onDateChange={(value:Dayjs) => {setReserveDate(value)}}/>
      </div>

      <button
        name="Reserve CoWorkingSpace"
        className="block rounded-md bg-sky-600 hover:bg-green-600 px-3 py-2 text-white shadow-sm"
        onClick={createReservation}
      >
        Reserve Co-Working Space
      </button>
    </main>
  );
}
