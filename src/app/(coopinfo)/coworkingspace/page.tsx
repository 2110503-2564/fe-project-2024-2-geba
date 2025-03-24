import CoWorkingSpaceList from "@/components/CoWorkingSpaceList";
import getCoWorkingSpaces from "@/libs/getCoWorkingSpaces";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default function CoWorkingSpaceInfo() {

    const coops = getCoWorkingSpaces();

    return (
        <main className="text-center p-5">
            <div className="font-bold text-2xl text-center">Select your Venue</div>
            <Suspense fallback={<p>Loading ... <LinearProgress/> </p>}>
                <CoWorkingSpaceList coopJson={coops}/>
            </Suspense>
        </main>
        
    );
}