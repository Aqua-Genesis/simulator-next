import {lifeDescriptions, lifeforms} from "@/components/constants";
import Image from "next/image";
import {useState} from "react";


export default function LifeSidebar({style}) {

  const [selectedLife, setSelectedLife] = useState("Silicon");

  return <div className="flex flex-col justify-center items-center h-full overflow-y-auto w-1/4 absolute" style={style}>

    <div className="flex flex-col items-center bg-window rounded-3xl px-6 py-4 mb-8">
      <p className="default text-xl mb-2">{selectedLife}</p>
      <p className="default">{lifeDescriptions[selectedLife]}</p>
    </div>

    <div className="flex flex-wrap justify-center mb-8">
      {lifeforms.map(life =>
        <Image key={life.name} src={life.imgSrc} alt={life.name}
               className="m-2 rounded-full"
               onClick={() => setSelectedLife(life.name)}
               width={90} height={90}
               style={selectedLife === life.name ? {
                 boxShadow: "0px 0px 5px white",
               } : {
                 opacity: 0.5,
               }}
        />
      )}
    </div>


    <div className="flex flex-col bg-window rounded-3xl  w-fit">

    </div>

  </div>
}