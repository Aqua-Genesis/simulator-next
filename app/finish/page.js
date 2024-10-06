'use client'
import Logo from "@/components/Logo";
import {useEffect, useState} from "react";

export default function Page({}) {

  const [score, setScore] = useState("000");
  const [temperature, setTemperature] = useState("000");

  useEffect(() => {
    // setScore(sessionStorage.getItem('score'));
  }, []);

  return <div className="flex flex-col justify-center flex-grow w-full h-full bg-background py-12 px-8">
    <Logo/>
    <p className="bebas text-blue2 text-7xl tracking-wide text-center">
      Your planet
    </p>
    <div className="flex flex-row flex-grow w-full h-0 pt-16">
      <div className="w-1/2">

      </div>
      <div className="w-1/2 ml-16">
        <p className="default text-blue2 text-3xl">Planet life score</p>
        <p className="default text-blue1 font-extrabold text-8xl">{score}</p>
        <p className="default text-blue2 text-2xl mt-8">Planet avg. temperature</p>
        <p className="default text-blue1 font-extrabold text-7xl">{temperature}</p>
        <p className="default text-blue2 text-2xl mt-8">Achievements</p>
      </div>
    </div>
  </div>
}