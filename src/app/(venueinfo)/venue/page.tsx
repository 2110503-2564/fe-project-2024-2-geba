import CardPanel from "@/components/CardPanel";
import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default function VenueInfo() {

    const venues = getVenues();

    return (
        <main className="text-center p-5">
            <div className="font-bold text-2xl text-center">Select your Venue</div>
            <Suspense fallback={<p>Loading ... <LinearProgress/> </p>}>
                <VenueCatalog venuesJson={venues}/>
            </Suspense>
        </main>
        
    );
}