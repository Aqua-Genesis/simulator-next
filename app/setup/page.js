'use client'
import InputWidget from "@/components/InputWidget";
import {inputsElements, inputsOther, defaultValues, colours} from "@/components/constants";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";


export default function Page() {

  const router = useRouter();
  const [values, setValues] = useState(defaultValues);
  const [pieData, setPieData] = useState([]);
  useEffect(() => {
    const newPieData = [];
    for (const [key, value] of Object.entries(values)) {
      if (colours[key] === "#56a3a6") continue;
      newPieData.push({
        label: key,
        value: value,
        color: colours[key]
      })
    }
    setPieData(newPieData);
  }, [values])

  return (
    <div className="flex flex-col items-center bg-background min-h-screen py-12 px-8">
      <p className="bebas text-blue2 text-5xl tracking-wide">
        Starting parameters
      </p>
      <div className="flex flex-row flex-grow w-full h-0 pt-8">

        <InputWidget
          values={values}
          setValues={setValues}
          inputs={inputsOther}
          isSelectable={false}
          handleSelect={()=>pass}
          style={{
            width: "33%"
          }}
        />

        <div className="flex items-center justify-center w-1/3 h-full">
          <p className="default">Pie chart</p>
          <button
            onClick={()=>router.push("/simulation")}
            className="default text-gray-900 bg-blue2 text-2xl pt-3 pb-2 px-8 absolute -bottom-0"
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30
            }}
          >
            Begin simulation
          </button>
        </div>

        <InputWidget
          values={values}
          setValues={setValues}
          inputs={inputsElements}
          isSelectable={false}
          handleSelect={()=>pass}
          style={{
            width: "33%"
          }}
        />
      </div>
    </div>
  );
}
