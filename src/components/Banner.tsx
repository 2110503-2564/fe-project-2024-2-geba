"use client";
import { useState } from "react";
import styles from "./banner.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = [
    "/img/cover.jpg",
    "/img/cover2.jpg",
    "/img/cover3.jpg",
    "/img/cover4.jpg",
  ];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const {data:session} = useSession();

  return (
    <div
      className={styles.banner}
      onClick={() => {
        setIndex(index + 1);
      }}
    >
      <Image
        src={covers[index % 4]}
        alt="cover"
        fill={true}
        priority
        objectFit="cover"
      />
      <div className={styles.bannerText}>
        <h1 className="text-5xl text-white font-semibold font-mono bg-transparent backdrop-blur-md">
          where every event finds its venue
        </h1>
        <h3 className="text-2xl text-white font-medium font-sans backdrop-blur-md">
          Finding venue has never been easier, whether it's a wedding, blap blap
          yap yap blah blah blah
        </h3>
      </div>

      <button
        className="bg-white border border-black
                font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
                hover:bg-black hover:text-white hover:border-transparent"
        onClick={(e) => {
          e.stopPropagation();
          router.push("/coworkingspace");
        }}
      >
        Select Co-Working Space
      </button>
    </div>
  );
}
