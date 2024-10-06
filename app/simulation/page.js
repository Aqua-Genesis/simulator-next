'use client'
import PlanetCanvas from "@/components/planet/PlanetCanvas";
import {useEffect, useState} from "react";
import {defaultValues, inputsElements, inputsOther, overlayOptions} from "@/components/constants";
import InputWidget from "@/components/InputWidget";
import SideButton from "@/components/SideButton";
import OverlaySidebar from "@/components/OverlaySidebar";
import { Vector3 } from "three";

function ph() {
  return (<div className="flex flex-col justify-center h-full overflow-y-auto w-1/3 mx-20"/>)
}

export default function Page() {

  const [planetType, setPlanetType] = useState("");
  const [values, setValues] = useState(defaultValues);
  const [overlays, setOverlays] = useState(overlayOptions);
  const [leftPanel, setLeftPanel] = useState(true);
  const [rightPanel, setRightPanel] = useState(true);


  useEffect(() => {
    setPlanetType(sessionStorage.getItem('planetType'));
  }, []);

  return <div className="flex flex-row flex-grow w-full h-full bg-background px-24">

    <SideButton
      text="Elements"
      position="top-right"
      onClick={() => setRightPanel(true)}
    />
    <SideButton
      text="Lifeforms"
      position="bottom-right"
      onClick={() => setRightPanel(false)}
    />
    <SideButton
      text="Parameters"
      position="top-left"
      onClick={() => setLeftPanel(true)}
    />
    <SideButton
      text="Overlays"
      position="bottom-left"
      onClick={() => setLeftPanel(false)}
    />

    <InputWidget
      values={values}
      setValues={setValues}
      inputs={inputsOther}
      isSelectable={true}
      handleSelect={()=>pass}
      style={{
        left: leftPanel ? 100 : -500,
        opacity: leftPanel ? 1 : 0,
        transition: "left 0.5s ease, opacity 0.5s ease-out"
      }}
    />
    <OverlaySidebar
      overlays={overlays} setOverlays={setOverlays}
      style={{
        left: leftPanel ? -500 : 100,
        opacity: leftPanel ? 0 : 1,
        transition: "left 0.5s ease, opacity 0.5s ease-out"
      }}
    />




    <div className="flex items-center justify-center w-full h-full">
      <PlanetCanvas overlay={0} 
        // 0 - no
        // 1 - volcanic
        //

        volcanic={100} rotationSpeed={0.1}
        atmosDensity={6.0} atmosScatter={new Vector3(0.9, 1.4, 2.0)}
        distance={3.5} lightDir={new Vector3(-2, -2, -2)}/>
    </div>

    <InputWidget
      values={values}
      setValues={setValues}
      inputs={inputsElements}
      isSelectable={true}
      handleSelect={()=>pass}
      style={{
        right: rightPanel ? 100 : -500,
        opacity: rightPanel ? 1 : 0,
        transition: "right 0.5s ease, opacity 0.5s ease-out"
      }}
    />
    <OverlaySidebar
      overlays={overlays} setOverlays={setOverlays}
      style={{
        right: rightPanel ? -500 : 100,
        opacity: rightPanel ? 0 : 1,
        transition: "right 0.5s ease, opacity 0.5s ease-out"
      }}
    />

  </div>
}
