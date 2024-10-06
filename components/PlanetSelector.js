'use client'
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import clsx from 'clsx';

export default function PlanetSelector ({type, handleSelect, imgSrc, imgSize, description, colour, i_d}) {

  const [descShown, setDescShown] = useState(false);
  function handleShow() {setDescShown(true)}
  function handleHide() {setDescShown(false)}


  return <div
    className="flex flex-col items-center justify-center w-1/3 mx-8"
  >
    <Image src={imgSrc} alt={imgSrc} width={imgSize} height={imgSize} onClick={() => handleSelect(i_d)}
           className="hover-trigger hover:scale-110 transition active:scale-100"
           onMouseEnter={() => handleShow()} onMouseLeave={() => handleHide()}
    />
    <p className={"default text-3xl mt-8" + " text-" + colour}>{type}</p>
    <p className={clsx("hover-receiver default text-lg mt-4 text-center mx-8 leading-tight transition",
      descShown ? "opacity-80" : "opacity-0")}
    >{description}</p>
  </div>

}