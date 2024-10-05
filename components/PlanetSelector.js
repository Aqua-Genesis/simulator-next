import Image from "next/image";
import {Button} from "@/components/Buttons";

export default function PlanetSelector ({imageLink, imageSize, description}) {
  return <div className="flex flex-col items-center w-fit p-4 bg-green2 rounded-2xl shadow-xl">
    <Image className="mb-2" src={imageLink} alt={imageLink} width={imageSize} height={imageSize} />
    <p className="mt-2">{description}</p>
    <Button text="Select"/>
  </div>
}