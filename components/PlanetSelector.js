'use client'
import Image from "next/image";
import Link from "next/link";

export default function PlanetSelector ({type, handleSelect, imgSrc, imageSize, description}) {
  return <div
    className="flex items-center w-1/3 bg-red-500"
  >
    <Link className="min-w-full min-h-full" href="/simulation">
      <Image src={imgSrc} alt={imgSrc} width={imageSize} height={imageSize} />
      <p className="default text-2xl mt-4">{description}</p>
    </Link>
  </div>

}