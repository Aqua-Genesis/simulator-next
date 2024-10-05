'use client'
import InputWidget from "@/components/InputWidget";
import {inputsElements, inputsOther} from "@/components/constants";
import {useEffect, useState} from "react";


export default function Page() {

  const defaultValues = {};
  const colours = {};
  for (const group of inputsElements.concat(inputsOther)) {
    for (const input of group.inputs) {
      defaultValues[input.name] = 0.5;
      colours[input.name] = input.colour;
    }
  }
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
        />

        <div className="flex items-center justify-center w-1/3 h-full">
          <p>Pie chart</p>
        </div>

        <InputWidget
          values={values}
          setValues={setValues}
          inputs={inputsElements}
          isSelectable={false}
          handleSelect={()=>pass}
        />
      </div>
    </div>
  );
}
