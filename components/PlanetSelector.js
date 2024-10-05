'use client'
import Image from "next/image";

export default function PlanetSelector ({type, handleSelect, imgSrc, imgSize, description, colour}) {
  return <div
    className="flex flex-col items-center justify-center w-1/3 px-8"
  >
      <Image src={imgSrc} alt={imgSrc} width={imgSize} height={imgSize} onClick={()=>handleSelect(type)}/>
      <p className={"default text-3xl mt-4"+" text-"+colour}>{type}</p>
      <p className="default text-lg mt-2 text-center mx-8">{description}</p>
  </div>

}