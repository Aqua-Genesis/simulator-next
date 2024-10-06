'use client'
import PlanetCanvas from "@/components/planet/PlanetCanvas";
import {useEffect, useState} from "react";
import {defaultValues, inputsElements, inputsOther, overlayOptions, planetNameFromID} from "@/components/constants";
import InputWidget from "@/components/InputWidget";
import SideButton from "@/components/SideButton";
import OverlaySidebar from "@/components/OverlaySidebar";
import { Vector3 } from "three";
import LifeSidebar from "@/components/LifeSidebar";
import Logo from "@/components/Logo";
import {Button} from "@/components/Buttons";
import {useRouter} from "next/navigation";
import LifeScore from "@/components/LifeScore";
import arrayShuffle from 'array-shuffle';


export default function Page() {

  const router = useRouter();
  const [planetType, setPlanetType] = useState("");
  const [values, setValues] = useState(defaultValues);
  const [overlays, setOverlays] = useState(overlayOptions);
  const [leftPanel, setLeftPanel] = useState("top");
  const [rightPanel, setRightPanel] = useState("top");
  const [score, setScore] = useState(Math.floor((Math.random()) * 1000));
  const [temperature, setTemperature] = useState(Math.floor((Math.random()-0.5) * 50));
  const [achievements, setAchievements] = useState(
    arrayShuffle(["Sulphur", "Phosphorus", "Silicon", "Nitrogen", "Titanium"]).slice(0, 3)
  );

  function handleLeftPanelChange (value) {
    if(leftPanel === value) setLeftPanel("none");
    else setLeftPanel(value);
  }
  function handleRightPanelChange (value) {
    if(rightPanel === value) setRightPanel("none");
    else setRightPanel(value);
  }

  useEffect(() => {
    setPlanetType(sessionStorage.getItem('planetType'));
  }, []);
  useEffect(() => {
    sessionStorage.setItem('score', score.toString());
    sessionStorage.setItem('temperature', temperature.toString());
    sessionStorage.setItem('achievements', JSON.stringify(achievements));
  }, [score, achievements, temperature]);

  return <div className="flex flex-row flex-grow w-full h-full bg-background px-24">
    <Logo/>

    <LifeScore score={score} style={{
      position: "absolute",
      top: "10vh",
      left: "50%",
      zIndex: 20,
      transform: "translate(-50%, -50%)",
    }}/>

    <Button text="Finished!" onClick={()=>router.push("/finish")}
            style={{
              position: "absolute",
              bottom: "5vh",
              left: "50%",
              zIndex: 20,
              transform: "translate(-50%, -50%)",
            }}
    />

    <SideButton
      text="Elements"
      position="top-right"
      selected={rightPanel === "top"}
      onClick={() => handleRightPanelChange("top")}
    />
    <SideButton
      text="Lifeforms"
      position="bottom-right"
      selected={rightPanel === "bottom"}
      onClick={() => handleRightPanelChange("bottom")}
    />
    <SideButton
      text="Parameters"
      position="top-left"
      selected={leftPanel === "top"}
      onClick={() => handleLeftPanelChange("top")}
    />
    <SideButton
      text="Overlays"
      position="bottom-left"
      selected={leftPanel === "bottom"}
      onClick={() => handleLeftPanelChange("bottom")}
    />

    <InputWidget
      planetType={planetType}
      values={values}
      setValues={setValues}
      inputs={inputsOther}
      isSelectable={true}
      handleSelect={()=>{}}
      style={{
        position: "absolute", width: "25%", zIndex:10,
        left: leftPanel==="top" ? 100 : -500,
        opacity: leftPanel==="top" ? 1 : 0,
        transition: "left 0.5s ease, opacity 0.5s ease-out"
      }}
    >
      <p className="default mb-8 text-center">Planet type: {planetNameFromID[planetType]}</p>
    </InputWidget>
    <OverlaySidebar
      overlays={overlays} setOverlays={setOverlays}
      style={{
        left: leftPanel==="bottom" ? 100 : -500,
        opacity: leftPanel==="bottom" ? 1 : 0,
        transition: "left 0.5s ease, opacity 0.5s ease-out"
      }}
    />


    <div className="flex items-center justify-center w-full h-full">
      <PlanetCanvas overlay={overlays["Volcanic activity hotspots"] ? 1 : 
        (overlays["Material composition"] ? 2 : (
          overlays["Material composition"] ? 3 : 0
        ))}
        // 0 - no
        // 1 - volcanic
        //
      
        volcanic={100} rotationSpeed={0.1}
        atmosDensity={6.0} atmosScatter={new Vector3(0.9, 1.4, 2.0)}
        distance={1} lightDir={new Vector3(-2, -2, -2)}/>
    </div>

    <InputWidget
      planetType={planetType}
      values={values}
      setValues={setValues}
      inputs={inputsElements}
      isSelectable={true}
      handleSelect={()=>{}}
      style={{
        position: "absolute", width: "25%",
        right: rightPanel==="top" ? 100 : -500,
        opacity: rightPanel==="top" ? 1 : 0,
        transition: "right 0.5s ease, opacity 0.5s ease-out"
      }}
    />
    <LifeSidebar
      style={{
        right: rightPanel==="bottom" ? 100 : -500,
        opacity: rightPanel==="bottom" ? 1 : 0,
        transition: "right 0.5s ease, opacity 0.5s ease-out"
      }}
    />

  </div>
}
