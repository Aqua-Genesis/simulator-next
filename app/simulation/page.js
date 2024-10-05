'use client'
import PlanetCanvas from "@/components/planet/PlanetCanvas";
import {useEffect, useState} from "react";
import {defaultValues, inputsElements, inputsOther} from "@/components/constants";
import InputWidget from "@/components/InputWidget";
import SideButton from "@/components/SideButton";

export default function Page() {

  const [planetType, setPlanetType] = useState("");
  const [values, setValues] = useState(defaultValues);
  const [leftPanel, setLeftPanel] = useState(true);
  const [rightPanel, setRightPanel] = useState(true);


  useEffect(() => {
    setPlanetType(sessionStorage.getItem('planetType'));
  }, []);

  return <div className="flex flex-row flex-grow w-full h-full bg-background">

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
    />

    <div className="flex items-center justify-center w-1/3 mx-8">
      <PlanetCanvas/>
    </div>

    <InputWidget
      values={values}
      setValues={setValues}
      inputs={inputsElements}
      isSelectable={true}
      handleSelect={()=>pass}
    />

  </div>
}
