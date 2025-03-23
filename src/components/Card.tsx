"use client";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";
import { useState } from "react";

export default function Card({
  venueName,
  imgSrc,
  showRating,
}: {
  venueName: string;
  imgSrc: string;
  showRating?: Function;
}) {
  const [value, setValue] = useState<number | null>(0);

  return (
    <InteractiveCard contentName={venueName}>
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Product Picture"
          fill={true}
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[30%] p-[10px]">
        <div className="font-semibold text-gray-800">{venueName}</div>
        {showRating ? (
          <Rating
            id={venueName + " Rating"}
            name={venueName + " Rating"}
            data-testid={venueName + " Rating"}
            value={value}
            onClick={(e) => e.stopPropagation()}
            onChange={(e, newValue) => {
              setValue(newValue);
              showRating(venueName, newValue);
            }}
          />
        ) : (
          ""
        )}
      </div>
    </InteractiveCard>
  );
}
