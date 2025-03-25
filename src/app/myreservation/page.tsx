import ReservationList from "@/components/ReservationList";

export default function MyReservation() {
  return (
    <main
      className="w-[60%] bg-white p-6 rounded-lg shadow-6xl flex flex-col
     space-y-4 border border-gray-300 mx-auto my-20"
    >
      <ReservationList />
    </main>
  );
}
