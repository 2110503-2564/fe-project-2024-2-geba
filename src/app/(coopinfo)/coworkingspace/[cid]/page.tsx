import Image from "next/image";
import getVenue from "@/libs/getCoworkingSpace";
import getCoworkingSpace from "@/libs/getCoworkingSpace";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function CoopDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token)
    return (
      <main className="w-[100%] flex flex-col items-center space-y-4">
        <div className="font-semibold text-gray-600 text-xl text-center">
          Please Sign in
        </div>
      </main>
    );

  const coopDetail = await getCoworkingSpace(params.cid, session.user.token);

  //mock data
  // const mockVenueRepo = new Map();
  // mockVenueRepo.set("001", { name: "The Bloom Pavilion", image: "/img/bloom.jpg" });
  // mockVenueRepo.set("002", { name: "Spark Space", image: "/img/sparkspace.jpg" });
  // mockVenueRepo.set("003", { name: "The Grand Table",image: "/img/grandtable.jpg",});

  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-bold">{coopDetail.data.name}</h1>
      <div className="flex flex-row my-5 ">
        {/* <Image
          src={coopDetail.data.picture}
          alt="Coop Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        /> */}
        <div className="text-md mx-5 text-left">
          <div className="font-semibold">Name: {coopDetail.data.name}</div>
          <div>Address: {coopDetail.data.address}</div>
          <div>Tel: {coopDetail.data.tel}</div>
          <div>Open time: {coopDetail.data.open_time}</div>
          <div>Close time: {coopDetail.data.close_time}</div>
        </div>
      </div>
    </main>
  );
}
