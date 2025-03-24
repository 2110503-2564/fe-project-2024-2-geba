import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { Link } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[50px] bg-gray-800 fixed top-0 left-0 right-0 z-30 flex flex-rowitems-center justify-end px-4">
      {session ? (
        <Link href="/api/auth/signout">
          <div className="flex items-center absolute left-0 h-full px-5 text-white text-sm font-semibold bg-gray-700">
            Sign out of {session.user?.name}
          </div>
        </Link>
      ) : (
        <Link href="/api/auth/signin">
          <div className="flex items-center absolute left-0 h-full px-5 text-white text-sm font-semibold bg-gray-700">
            Sign in
          </div>
        </Link>
      )}
      <TopMenuItem title="My Booking" pageRef="/mybooking"/>

      <TopMenuItem title="Booking" pageRef="/booking" />
      <Link key="home" href="/">
        <Image
          src={"/img/logo.png"}
          className="h-[100%] w-auto"
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
        />
      </Link>
    </div>
  );
}
