'use client'
import Logo from "@/components/Logo";
import {useEffect, useState} from "react";
import {Achievements} from "@/components/LifeSidebar";
import {lifeImages} from "@/components/constants";
import PlanetCanvas from "@/components/planet/PlanetCanvas";
import {Vector3} from "three";

export default function Page() {

  const [score, setScore] = useState("000");
  const [temperature, setTemperature] = useState("000");
  const [achievementList, setAchievementList] = useState([]);
  useEffect(() => {
    setScore(sessionStorage.getItem('score'));
    setTemperature(sessionStorage.getItem('temperature'));
    const rawList = sessionStorage.getItem("achievements");
    if(rawList === null) {setAchievementList([]); return;}
    const list = JSON.parse(sessionStorage.getItem("achievements"));
    let list2 = [];
    for (const item of list) {
      list2.push({name: item, imgSrc: lifeImages[item]});
    }
    setAchievementList(list2);
  }, []);

  return <div className="flex flex-col justify-center flex-grow w-full h-full bg-background py-12 px-8">
    <Logo/>
    <p className="bebas text-blue2 text-7xl tracking-wide text-center">
      Your planet
    </p>
    <div className="flex flex-row flex-grow w-full h-0 pt-16">
      <div className="w-1/2">
        <PlanetCanvas overlay={0}
                      volcanic={100} rotationSpeed={0.1}
                      atmosDensity={6.0} atmosScatter={new Vector3(0.9, 1.4, 2.0)}
                      distance={6} lightDir={new Vector3(-2, -2, -2)}
        />
      </div>
      <div className="w-1/2 ml-16">
        <p className="default text-blue2 text-3xl">Planet life score</p>
        <p className="default text-blue1 font-extrabold text-8xl">{score}</p>
        <p className="default text-blue2 text-2xl mt-8">Planet avg. temperature</p>
        <p className="default text-blue1 font-extrabold text-7xl">{temperature}<span className="text-4xl ml-1">°C</span></p>
        <p className="default text-blue2 text-2xl mt-8 mb-4">Achievements</p>
        <Achievements
          size={50}
          selectedLife={""} setSelectedLife={()=>{}}
          highlight={false} list={achievementList}
        />
      </div>
    </div>
  </div>
}