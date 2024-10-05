'use client'
import Slider from "@/components/Slider";
import {useState} from "react";

export default function Page() {

  const planetType = sessionStorage.getItem('planetType');
  const [temp, setTemp] = useState();

  return <div className="flex flex-row h-full overflow-hidden">
    <div className="flex items-center justify-center bg-black w-2/3">
      <p className="text-4xl">Simulation</p>
    </div>
    <div className="bg-background w-1/3">
      <Slider
        label="Temperature" range={[5, 10]}
        value={temp} setValue={setTemp}
      />
    </div>
  </div>
}