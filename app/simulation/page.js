'use client'
import PlanetCanvas from "@/components/planet/PlanetCanvas";
import {useEffect, useState} from "react";
import {defaultValues, inputsElements, inputsOther} from "@/components/constants";
import InputWidget from "@/components/InputWidget";

export default function Page() {

  const [planetType, setPlanetType] = useState("");
  const [values, setValues] = useState(defaultValues);


  useEffect(() => {
    setPlanetType(sessionStorage.getItem('planetType'));
  }, []);

  return <div className="flex flex-row flex-grow w-full h-full bg-background">

    <InputWidget
      values={values}
      setValues={setValues}
      inputs={inputsOther}
      isSelectable={true}
      handleSelect={()=>pass}
    />

    <div className="flex items-center justify-center bg-black w-1/3">
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
