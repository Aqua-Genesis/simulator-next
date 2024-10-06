import Image from "next/image";


export default function Logo({onClick}) {
  return <Image src="/logo2.png" height={50} width={200} alt="Back to start"
                className="absolute top-8 left-6" onClick={onClick}
  />
}