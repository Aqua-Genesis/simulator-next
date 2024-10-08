'use client'
import PlanetSelector from "@/components/PlanetSelector";
import {planetList} from "@/components/constants";
import Image from "next/image";
import {useRouter} from "next/navigation";
import Logo from "@/components/Logo";


export default function Page() {

  const router = useRouter();
  function handleSelect(type) {
    sessionStorage.setItem("planetType", type);
    router.push("/setup");
  }

  return <div className="flex flex-col items-center bg-background h-full py-12 px-16 overflow-hidden">
    <p className="bebas text-blue2 text-7xl tracking-[0.15em]">
      Aqua Genesis
    </p>
    <p className="dancing text-blue3 text-4xl">
      Create your own ocean world!
    </p>

    <Image src="/home/parent_planet.png" alt="" width={500} height={200}
           className="absolute bottom-0 right-0"
    />
    <Image src="/home/sun.png" alt="" width={80} height={80}
           className="absolute top-[100px] -left-3"
    />

    <div className="flex w-full mt-20">
      {
        planetList.map(planet => <PlanetSelector
          handleSelect={handleSelect}
          type={planet.type} key={planet.type} i_d={planet.id}
          imgSrc={planet.imgSrc} imgSize={planet.imgSize}
          description={planet.description}
          colour={planet.colour}
        />)
      }

    </div>

  </div>
}
