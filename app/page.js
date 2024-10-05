'use client'
import PlanetSelector from "@/components/PlanetSelector";
import {planetList} from "@/components/constants";

export default function Page() {

  function handleSelect(type) {
    sessionStorage.setItem("planetType", type);
  }

  return (<div className="flex flex-col items-center bg-background h-full py-12 px-16 overflow-hidden">
    <p className="bebas text-blue2 text-7xl tracking-[0.15em]">
      Aqua Genesis
    </p>
    <p className="dancing text-blue3 text-4xl">
      Create your own ocean world!
    </p>

    <div className="flex w-full my-16">
      {
        planetList.map(planet => <PlanetSelector
          handleSelect={handleSelect}
          type={planet.type} key={planet.type}
          imgSrc={planet.imgSrc} imageSize={250}
          description={planet.description}
        />)
      }

    </div>
  </div>)
}
