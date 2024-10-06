'use client'
import Image from "next/image";
import {useRouter} from "next/navigation";


export default function Logo({}) {

  const router = useRouter();
  return <Image src="/logo2.png" height={50} width={200} alt="Back to start"
                className="absolute top-8 left-6 cursor-pointer z-50" onClick={()=>router.push("/")}
  />
}