"use client";
import Card from "@/components/Card";
import { useReducer } from "react";
import Link from "next/link";

export default function CardPanel() {
  let defaultVenue = new Map<string, number>([
    ["The Bloom Pavilion", 0],
    ["Spark Space", 0],
    ["The Grand Table", 0],
  ]);

  const cardReducer = (
    venueList: Map<string, number>,
    action: { type: string; venueName: string; rating?: number }
  ) => {
    switch (action.type) {
      case "add": {
        const newList = new Map(venueList);
        newList.set(action.venueName, action.rating ?? 0);
        return newList;
      }
      case "remove": {
        const newList = new Map(venueList);
        newList.delete(action.venueName);
        return newList;
      }
      default:
        return venueList;
    }
  };

  const [venueList, setCardRating] = useReducer(
    cardReducer,
    new Map(defaultVenue)
  );

  //mock
  const mockVenueRepo = [
    { vid: "001", name: "The Bloom Pavilion", imgSrc: "/img/bloom.jpg" },
    { vid: "002", name: "Spark Space", imgSrc: "/img/sparkspace.jpg" },
    { vid: "003", name: "The Grand Table", imgSrc: "/img/grandtable.jpg" },
  ];

  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around",
        }}
      >
        {mockVenueRepo.map((venue) => (
          <Link href={`/venue/${venue.vid}`} className="w-1/5">
            <Card
              venueName={venue.name}
              imgSrc={venue.imgSrc}
              showRating={(venue: string, star: number) =>
                setCardRating({ type: "add", venueName: venue, rating: star })
              }
            />
          </Link>
        ))}
      </div>

      <div className="w-full text-xl font-medium mx-5">
        Venue List with Ratings: {venueList.size}
      </div>
      {Array.from(venueList).map(([venueName, rating]) => (
        <div
          key={venueName}
          data-testid={venueName}
          onClick={(e) =>
            setCardRating({ type: "remove", venueName: venueName })
          }
          className="mx-5"
        >
          {venueName} Rating: {rating}
        </div>
      ))}
    </div>
  );
}
