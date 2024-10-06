'use client'
export default function LifeScore({score, style}) {
  let s = "000" + score;
  s = s.substring(s.length-4);
  return <div className="flex flex-col items-center bg-blue2 px-10 py-2 rounded-full" style={style}>
    <p className="default text-4xl font-bold text-gray-900">{s}</p>
    <p className="default text text-gray-900 -mt-1">Life score</p>
  </div>
}