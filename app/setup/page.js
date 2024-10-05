'use client'
import InputWidget from "@/components/InputWidget";
import {inputs} from "@/components/constants";
import {useState} from "react";


export default function Page() {

  const defaultValues = {};
  for (const group of inputs) {
    for (const input of group.inputs) {
      defaultValues[input.name] = 0.4;
    }
  }
  const [values, setValues] = useState(defaultValues);

  return <div className="flex flex-col items-center bg-background h-full py-12 px-16 overflow-hidden">
    <p className="bebas text-blue2 text-7xl tracking-wide">
      Starting parameters
    </p>

    <div className="flex w-full h-full mt-12">
      <div className="flex items-center justify-center w-1/2 bg-gray-800">
        <p>Pie chart</p>
      </div>
      <div className="flex items-center justify-center w-1/2">
        <InputWidget
          values={values}
          setValues={setValues}
        />
      </div>
    </div>

  </div>
}