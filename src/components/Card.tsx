"use client";
import InteractiveCard from "./InteractiveCard";

export default function Card({
  coopName,
  address,
  tel,
  open_time,
  close_time
}: {
  coopName:string;
  address:string;
  tel:string;
  open_time:string;
  close_time:string;
}) {

  return (
    <InteractiveCard>
      <div className="w-full h-[90%] p-[10px]">
        <div className="font-semibold text-gray-800">{coopName}</div>
        <div className="text-sm m-1">Address : {address}</div>
        <div className="text-sm m-1">Tel. : {tel}</div>
        <div className="text-sm m-1">Open Time: {open_time}</div>
        <div className="text-sm m-1">Close Time: {close_time}</div>
      </div>
    </InteractiveCard>
  );
}
