"use client";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem, TextField, Button } from "@mui/material";
import updateReservation from "@/libs/updateReservations";
import getUserProfile from "@/libs/getUserProfile";
import dayjs, { Dayjs } from "dayjs";
import { CoWorkingSpaceItem, User } from "../../../../interface";
import getCoWorkingSpaces from "@/libs/getCoWorkingSpaces";

export default function EditReservation() {
  const router = useRouter();
  const params = useParams();
  const rid = params.rid;
  const { data: session } = useSession();

  if (!session || !session.user.token) {
    return (
      <main className="w-[100%] flex flex-col items-center space-y-4">
        <div className="font-semibold text-gray-600 text-xl text-center">
          Please Sign in
        </div>
      </main>
    );
  }

  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [user, setUser] = useState<string>("");
  const [coWorkingSpaces, setCoWorkingSpaces] = useState<CoWorkingSpaceItem[]>(
    []
  );
  const [selectedSpace, setSelectedSpace] = useState<string>("");
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserProfile(session.user.token);
        setProfile(response.data);
        setUser(response.data._id);
      } catch (error) {
        console.error("Failed to fetch User Profile");
      }
    };

    const fetchCoWorkingSpaces = async () => {
      try {
        const response = await getCoWorkingSpaces(session.user.token);
        setCoWorkingSpaces(response.data);
        console.log(coWorkingSpaces);
      } catch (error) {
        console.error("Failed to fetch co-working spaces:", error);
      }
    };

    fetchUser();
    fetchCoWorkingSpaces();
    setLoading(false);
  }, []);

  const handleEdit = async () => {
    if (!session || !user || !selectedSpace || !reserveDate) {
      setMessage("All fields must be filled before submission.");
      return;
    }

    try {
      const response = await updateReservation(
        rid as string,
        reserveDate.toDate(),
        session.user.token
      );

      if (!response.ok) {
        setMessage(response.message)
        return;
      }

      alert("Reservation edited, Close this page");
    } catch (error) {
      setMessage("Unexpected Error Occurred");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 text-lg">Loading...</div>;
  }

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-2xl font-bold">Edit Your Reservation</div>
      <div className="w-fit">
        <div className="text-md text-left font-semibold text-gray-600 mt-5">
          Reservation Information
        </div>
        <TextField
          variant="standard"
          name="User"
          label="User"
          value={profile?.name || ""}
          disabled
        />

        <div className="text-md text-left font-semibold text-gray-600 mt-5">
          Co-Working Space Selection
        </div>
        <Select
          variant="standard"
          id="CoWorkingSpace"
          className="h-[2em] w-[200px]"
          value={selectedSpace}
          onChange={(e) => setSelectedSpace(e.target.value)}
        >
          {coWorkingSpaces.map((space) => (
            <MenuItem key={space._id} value={space._id}>
              {space.name}
            </MenuItem>
          ))}
        </Select>

        <div className="text-md text-left font-semibold text-gray-600 mt-5">
          Reservation Date
        </div>
        <DateReserve
          onDateChange={(value: Dayjs) => {
            setReserveDate(value);
          }}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleEdit}
      >
        Confirm Editing
      </Button>
      <p className="text-red-500 mt-3">{message}</p>
    </main>
  );
}
