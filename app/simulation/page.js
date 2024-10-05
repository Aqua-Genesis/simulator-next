'use client'
import PlanetCanvas from "@/components/planet/PlanetCanvas";
import Slider from "@/components/Slider";
import {useEffect, useState} from "react";

export default function Page() {

  const [planetType, setPlanetType] = useState("");
  const [temp, setTemp] = useState();

  useEffect(() => {
    setPlanetType(sessionStorage.getItem('planetType'));
  }, []);

  return <div className="flex flex-row h-full overflow-hidden">

    <div className="flex items-center justify-center bg-black w-2/3">
      <PlanetCanvas/>
    </div>

    <div className="bg-background w-1/3">
      <p>{planetType}</p>
      <Slider
        label="Temperature" range={[5, 10]}
        value={temp} setValue={setTemp}
      />
    </div>
  </div>
}
