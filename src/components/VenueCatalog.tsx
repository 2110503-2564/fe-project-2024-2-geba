import Link from "next/link";
import Card from "./Card";
import { VenueJson, VenueItem } from "../../interface";

export default async function VenueCatalog({venuesJson} : {venuesJson:Promise<VenueJson>}) {

    const venuesJsonYay = await venuesJson
    const venueDetail = venuesJsonYay.data

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
        {venueDetail.map((venue:VenueItem) => (
          <Link key={venue.id} href={`/venue/${venue.id}`} className="w-1/5">
            <Card
              venueName={venue.name}
              imgSrc={venue.picture}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
