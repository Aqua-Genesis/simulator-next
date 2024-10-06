'use client'
import {lifeDescriptions, lifeforms} from "@/components/constants";
import Image from "next/image";
import {useState} from "react";


export function Achievements({selectedLife, setSelectedLife, highlight, list}) {
  return <div className={highlight ? "flex flex-wrap mb-8 justify-center":"flex flex-wrap mb-8"}>
    {list.map(life =>
      <Image key={life.name} src={life.imgSrc} alt={life.name}
             className="m-2 rounded-full"
             onClick={() => setSelectedLife(life.name)}
             width={90} height={90}
             style={highlight ? selectedLife === life.name ? {
               boxShadow: "0px 0px 5px white",
             } : {
               opacity: 0.5,
             }: {}}
      />
    )}
  </div>
}

export default function LifeSidebar({style}) {

  const [selectedLife, setSelectedLife] = useState("Silicon");

  return <div className="flex flex-col justify-center items-center h-full overflow-y-auto w-1/4 absolute" style={style}>

    <div className="flex flex-col items-center rounded-3xl px-6 py-4 mb-8">
      <p className="default text-2xl font-bold mb-3 text-center">{selectedLife}</p>
      <p className="default text-center leading-4">{lifeDescriptions[selectedLife]}</p>
    </div>

    <Achievements
      selectedLife={selectedLife} setSelectedLife={setSelectedLife}
      highlight={true} list={lifeforms}
    />

    <div className="flex flex-col bg-window rounded-3xl  w-fit">

    </div>

  </div>
}