'use client'
import Image from "next/image";
import Link from "next/link";

export default function PlanetSelector ({type, handleSelect, imgSrc, imgSize, description, colour}) {
  return <div
    className="flex items-center w-1/3 px-8"
  >
    <Link className="min-w-full min-h-full flex flex-col items-center justify-center"
          href="/simulation" onClick={()=>handleSelect(type)}
    >
      <Image src={imgSrc} alt={imgSrc} width={imgSize} height={imgSize} />
      <p className={"default text-3xl mt-4"+" text-"+colour}>{type}</p>
      <p className="default text-lg mt-2 text-center mx-8">{description}</p>
    </Link>
  </div>

}