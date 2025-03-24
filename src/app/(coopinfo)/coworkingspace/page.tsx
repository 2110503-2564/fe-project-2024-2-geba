import CoWorkingSpaceList from "@/components/CoWorkingSpaceList";
import getCoWorkingSpaces from "@/libs/getCoWorkingSpaces";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function CoWorkingSpaceInfo() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token)
    return (
      <main className="w-[100%] flex flex-col items-center space-y-4">
        <div className="font-semibold text-gray-600 text-xl text-center">
          Please Sign in
        </div>
      </main>
    );

  const coops = getCoWorkingSpaces(session.user.token);

  return (
    <main className="text-center p-5">
      <div className="font-bold text-2xl text-center">
        Select your Co-Working Space
      </div>
      <Suspense
        fallback={
          <p>
            Loading ... <LinearProgress />{" "}
          </p>
        }
      >
        <CoWorkingSpaceList coopJson={coops} />
      </Suspense>
    </main>
  );
}
