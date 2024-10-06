'use client'
import PlanetCanvas from "@/components/planet/PlanetCanvas";
import {useEffect, useState} from "react";
import {defaultValues, inputsElements, inputsOther} from "@/components/constants";
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
      style={{
        left: leftPanel ? -500 : 100,
        opacity: leftPanel ? 0 : 1,
        transition: "left 0.5s ease, opacity 0.5s ease-out"
      }}
    />




    <div className="flex items-center justify-center w-full h-full">
      <PlanetCanvas overlay={1} volcanic={100} rotationSpeed={0.1}
        atmosDensity={4.0} atmosScatter={new Vector3(0.7, 1.3, 2.0)}/>
    </div>

    <InputWidget
      values={values}
      setValues={setValues}
      inputs={inputsElements}
      isSelectable={true}
      handleSelect={()=>pass}
      style={{
        right: 100
      }}
    />

  </div>
}
